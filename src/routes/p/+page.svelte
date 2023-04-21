<script lang="ts">
	import 'chart.js/auto';
	import { Bar, Pie, Doughnut, PolarArea } from 'svelte-chartjs';
	import ReconnectingWebSocket from 'reconnecting-websocket';
	import QrCode from 'svelte-qrcode';
	import { onMount } from 'svelte';
	import { token } from '../../stores';
	import { page } from '$app/stores';

	const id = $page.url.searchParams.get('id');

	let data;
	let slides;
	let question_order = [];

	let index = 0;

	let slider_count = {};
	let questions = {};
	let dataset = {};

	// чё
	function add2dataset(value: any, question: any) {
		if (value.question_type == 1) {
			if (!Object.hasOwn(dataset, value.question_id))
				dataset[value.question_id] = new Array(question.options.length).fill(0);
			for (const selected of value.selected) dataset[value.question_id][selected] += 1;
		} else if (value.question_type == 2) {
			if (!Object.hasOwn(dataset, value.question_id))
				dataset[value.question_id] = new Array(question.options.length).fill(0);
			if (!Object.hasOwn(slider_count, value.question_id)) slider_count[value.question_id] = 0;
			const sc = slider_count[value.question_id];
			for (const [i, slider] of value.sliders.entries())
				dataset[value.question_id][i] = (dataset[value.question_id][i] * sc + slider) / (sc + 1);
			slider_count[value.question_id] += 1;
		} else if (value.question_type == 3) {
			if (!Object.hasOwn(dataset, value.question_id))
				dataset[value.question_id] = new Array(question.options.length).fill(0);
			for (const [i, rank] of value.ranks.entries())
				dataset[value.question_id][rank] += (question.max_ranks ?? question.options.length) - i;
		} else if (value.question_type == 4) {
			if (!Object.hasOwn(dataset, value.question_id)) dataset[value.question_id] = new Array();
			dataset[value.question_id].push(value.text);
		}
	}

	function parseSlides() {
		let new_slides = [];
		for (const plot of data.poll.plots) {
			if (plot.plot_type == 6) continue;
			for (let i = 0; i < plot.questions.length; i++) {
				questions[plot.questions[i].question_id] = plot.questions[i];

				let datasets = [];
				let labels = [];
				for (let j = 0; j < i + 1; j++) {
					let z = 0;
					for (let k = 0; k < j; k++) {
						z += plot.questions[k].options.length;
					}
					for (const option of plot.questions[j].options) {
						labels.push(option.label);
					}
					datasets.push({
						label: plot.questions[j].label,
						data: new Array(z).fill(0).concat(dataset[plot.questions[j].question_id])
					});
				}
				new_slides.push({
					_plot_type: plot.plot_type,
					_name: plot.name,
					labels: labels,
					datasets: datasets
				});
			}
		}
		slides = new_slides;
	}

	async function send_current_question() {
		if (index === 0) return;

		await fetch(
			`https://pollify.igorek.dev/api/v1/answers/send/question` +
				`?poll_id=${id}` +
				`&question_id=${question_order[index - 1]}`,
			{
				method: 'POST',
				headers: {
					'X-Token': $token
				}
			}
		);
	}

	onMount(async () => {
		await fetch(`https://pollify.igorek.dev/api/v1/poll/get/id?id=${id}`, {
			method: 'GET'
		})
			.then((d) => d.json())
			.then((json) => (data = json));
		for (const plot of data.poll.plots)
			for (const question of plot.questions) question_order.push(question.question_id);

		await fetch(`https://pollify.igorek.dev/api/v1/answers/get/values?poll_id=${id}`, {
			method: 'GET',
			headers: {
				'X-Token': $token
			}
		})
			.then((d) => d.json())
			.then((json) => {
				for (const value of json) {
					add2dataset(value, questions[value.question_id]);
				}
			});

		new ReconnectingWebSocket(
			`wss://pollify.igorek.dev/api/v1/answers/listen/values?poll_id=${id}`
		).addEventListener('message', (message) => {
			let json = JSON.parse(message.data);
			add2dataset(json, questions[json.question_id]);
			parseSlides();
		});

		parseSlides();
	});

	$: if (data) parseSlides();
	$: console.log('react');
</script>

<div class="vh-100 container-fluid">
	{#if !data || !slides}
		<div class="vh-100 d-flex justify-content-center align-items-center my-auto">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Загрузка...</span>
			</div>
		</div>
	{:else}
		<div class="vh-100 d-flex flex-column">
			<div class="position-absolute bottom-0 end-0" />
			{#if index === 0}
				<div class="justify-content-center d-flex align-items-center flex-column flex-grow-1">
					<h1 class="text-center mb-5">{data.poll.name}</h1>
					<QrCode value={`t.me/ThePollifyBot?start=${id}`} size="480" />
				</div>
			{:else}
				<div class="flex-grow-1">
					<div style="height: 100%">
						{#if slides[index - 1]._plot_type == 1 || slides[index - 1]._plot_type == 4}
							<Bar
								data={slides[index - 1]}
								options={{ maintainAspectRatio: false, animation: false }}
							/>
						{:else if slides[index - 1]._plot_type == 2}
							<Pie
								data={slides[index - 1]}
								options={{ maintainAspectRatio: false, animation: false }}
							/>
						{:else if slides[index - 1]._plot_type == 3}
							<Doughnut
								data={slides[index - 1]}
								options={{ maintainAspectRatio: false, animation: false }}
							/>
						{:else if slides[index - 1]._plot_type == 5}
							<PolarArea
								data={slides[index - 1]}
								options={{ maintainAspectRatio: false, animation: false }}
							/>
						{/if}
					</div>
				</div>
			{/if}
			<div class="mx-auto mt-auto">
				<div class="btn-group m-3" role="group" aria-label="Basic example">
					<button
						type="button"
						class="btn btn-outline-secondary"
						disabled={index == 0}
						on:click={() => {
							index -= 1;
							send_current_question();
						}}>{'⮜'}</button
					>
					<span class="my-auto mx-3">{`${index + 1}/${slides.length + 1}`}</span>
					<button
						type="button"
						class="btn btn-outline-secondary"
						disabled={index == slides.length}
						on:click={() => {
							index += 1;
							send_current_question();
						}}>{'⮞'}</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>
