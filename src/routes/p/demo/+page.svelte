<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';

	Chart.register(WordCloudController, WordElement);

	const data = {
		id: 1,
		owner: {
			id: 1,
			username: 'root'
		},
		poll: {
			name: 'Test Poll Schema',
			plots: [
				{
					plot_type: 1,
					name: 'Bar Plot',
					questions: [
						{
							question_id: '719356d8-e4f1-4c07-9bb7-36f6626ddf97',
							question_type: 1,
							label: 'Selector Question 1',
							description: null,
							image: null,
							hide_results: true,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: null
								},
								{
									label: 'Option 3',
									image: null
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_checked: 2,
							max_checked: 3
						},
						{
							question_id: 'e6696cc2-f2b5-4698-a708-9132a3c151d5',
							question_type: 1,
							label: 'Selector Question 2',
							description: null,
							image: null,
							hide_results: false,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: 'https://i.stack.imgur.com/ajwm5.png'
								},
								{
									label: 'Option 3',
									image: null
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_checked: 1,
							max_checked: 1
						},
						{
							question_id: '83943acb-347e-4e40-bd9b-8fe61ce29c0f',
							question_type: 1,
							label: 'Selector Question 3',
							description: null,
							image: null,
							hide_results: true,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: null
								},
								{
									label: 'Option 3',
									image: null
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_checked: 1,
							max_checked: null
						}
					]
				},
				{
					plot_type: 2,
					name: 'Pie Plot',
					questions: [
						{
							question_id: 'fc47f94f-7e97-4877-9568-8e54259b43f5',
							question_type: 2,
							label: 'Slider Question 1',
							description: null,
							image: null,
							hide_results: false,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: null
								},
								{
									label: 'Option 3',
									image: 'https://i.stack.imgur.com/ajwm5.png'
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_value: 1,
							max_value: 10
						},
						{
							question_id: '7ccc93b7-6397-417e-81ff-fa29e16e787a',
							question_type: 2,
							label: 'Slider Question 2',
							description: null,
							image: null,
							hide_results: true,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: null
								},
								{
									label: 'Option 3',
									image: null
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_value: 5,
							max_value: 10
						}
					]
				},
				{
					plot_type: 3,
					name: 'Doughnut Plot',
					questions: [
						{
							question_id: '9e75e591-89ea-4fc9-918e-6cb53c61bafa',
							question_type: 2,
							label: 'Slider Question 1',
							description: null,
							image: null,
							hide_results: false,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: null
								},
								{
									label: 'Option 3',
									image: 'https://i.stack.imgur.com/ajwm5.png'
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_value: 1,
							max_value: 10
						},
						{
							question_id: '8ea5f63a-5c2f-4c4a-89c1-d726b27af823',
							question_type: 2,
							label: 'Slider Question 2',
							description: null,
							image: null,
							hide_results: true,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: null
								},
								{
									label: 'Option 3',
									image: null
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_value: 5,
							max_value: 10
						}
					]
				},
				{
					plot_type: 4,
					name: 'Bar Plot',
					questions: [
						{
							question_id: '878698bd-a47b-4af1-91ea-ae261e35feb0',
							question_type: 3,
							label: 'Top List Question 1',
							description: null,
							image: null,
							hide_results: true,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: null
								},
								{
									label: 'Option 3',
									image: null
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_ranks: 2,
							max_ranks: 3
						},
						{
							question_id: '51c1a04e-90b2-4a79-a2fc-159e41137c15',
							question_type: 3,
							label: 'Top List Question 2',
							description: null,
							image: null,
							hide_results: true,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: null
								},
								{
									label: 'Option 3',
									image: null
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_ranks: 3,
							max_ranks: 3
						},
						{
							question_id: '73399275-0fec-4443-980b-f47e96ac3502',
							question_type: 3,
							label: 'Top List Question 3',
							description: null,
							image: null,
							hide_results: false,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: 'https://i.stack.imgur.com/ajwm5.png'
								},
								{
									label: 'Option 3',
									image: null
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_ranks: 1,
							max_ranks: null
						}
					]
				},
				{
					plot_type: 5,
					name: 'Area Plot',
					questions: [
						{
							question_id: '62556891-9d7c-4cd6-8bef-ef5b00c3db98',
							question_type: 1,
							label: 'Selector Question 1',
							description: null,
							image: null,
							hide_results: true,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: null
								},
								{
									label: 'Option 3',
									image: null
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_checked: 2,
							max_checked: 3
						},
						{
							question_id: '32be15d3-c2c7-418d-baca-d36726dd8a94',
							question_type: 1,
							label: 'Selector Question 2',
							description: null,
							image: null,
							hide_results: false,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: 'https://i.stack.imgur.com/ajwm5.png'
								},
								{
									label: 'Option 3',
									image: null
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_checked: 1,
							max_checked: 1
						},
						{
							question_id: 'fcfa8b92-db7a-4fd5-9fee-9f228f94f070',
							question_type: 1,
							label: 'Selector Question 3',
							description: null,
							image: null,
							hide_results: true,
							options: [
								{
									label: 'Option 1',
									image: null
								},
								{
									label: 'Option 2',
									image: null
								},
								{
									label: 'Option 3',
									image: null
								},
								{
									label: 'Option 4',
									image: null
								},
								{
									label: 'Option 5',
									image: null
								}
							],
							min_checked: 1,
							max_checked: null
						}
					]
				},
				{
					plot_type: 6,
					name: 'Word Cloud Plot',
					questions: [
						{
							question_id: '3d8ad27c-a78d-468e-9396-d4bc059e713d',
							question_type: 4,
							label: 'Text Question 1',
							description: 'Description text',
							image: 'https://i.stack.imgur.com/ajwm5.png',
							hide_results: false,
							min_length: 5,
							max_length: 10
						},
						{
							question_id: 'f43f74fb-51e7-46d2-8b23-9de109434e46',
							question_type: 4,
							label: 'Text Question 2',
							description: null,
							image: null,
							hide_results: false,
							min_length: null,
							max_length: 10
						},
						{
							question_id: '02c6eb87-41ab-4951-a22c-3f9217e78426',
							question_type: 4,
							label: 'Text Question 3',
							description: null,
							image: null,
							hide_results: false,
							min_length: 5,
							max_length: null
						},
						{
							question_id: '887e1ba8-ef6a-4a54-8ef6-81ed5e29c7d5',
							question_type: 4,
							label: 'Text Question 4',
							description: null,
							image: null,
							hide_results: false,
							min_length: null,
							max_length: null
						}
					]
				}
			]
		}
	};
	const values = [
		{
			question_id: '887e1ba8-ef6a-4a54-8ef6-81ed5e29c7d5',
			question_type: 4,
			text: ''
		},
		{
			question_id: '887e1ba8-ef6a-4a54-8ef6-81ed5e29c7d5',
			question_type: 4,
			text: '1235678901234567890'
		},
		{
			question_id: 'f43f74fb-51e7-46d2-8b23-9de109434e46',
			question_type: 4,
			text: ''
		},
		{
			question_id: '3d8ad27c-a78d-468e-9396-d4bc059e713d',
			question_type: 4,
			text: '123567890'
		},
		{
			question_id: '3d8ad27c-a78d-468e-9396-d4bc059e713d',
			question_type: 4,
			text: '12345'
		},
		{
			question_id: 'fcfa8b92-db7a-4fd5-9fee-9f228f94f070',
			question_type: 1,
			selected: [0, 1, 2, 3, 4]
		},
		{
			question_id: 'fcfa8b92-db7a-4fd5-9fee-9f228f94f070',
			question_type: 1,
			selected: [1]
		},
		{
			question_id: '32be15d3-c2c7-418d-baca-d36726dd8a94',
			question_type: 1,
			selected: [1]
		},
		{
			question_id: '62556891-9d7c-4cd6-8bef-ef5b00c3db98',
			question_type: 1,
			selected: [0, 2, 4]
		},
		{
			question_id: '62556891-9d7c-4cd6-8bef-ef5b00c3db98',
			question_type: 1,
			selected: [0, 2]
		},
		{
			question_id: '73399275-0fec-4443-980b-f47e96ac3502',
			question_type: 3,
			ranks: [4, 3, 2, 1, 0]
		},
		{
			question_id: '73399275-0fec-4443-980b-f47e96ac3502',
			question_type: 3,
			ranks: [4]
		},
		{
			question_id: '51c1a04e-90b2-4a79-a2fc-159e41137c15',
			question_type: 3,
			ranks: [4, 2, 3]
		},
		{
			question_id: '878698bd-a47b-4af1-91ea-ae261e35feb0',
			question_type: 3,
			ranks: [4, 2, 3]
		},
		{
			question_id: '878698bd-a47b-4af1-91ea-ae261e35feb0',
			question_type: 3,
			ranks: [4, 2]
		},
		{
			question_id: '8ea5f63a-5c2f-4c4a-89c1-d726b27af823',
			question_type: 2,
			sliders: [10, 9, 8, 7, 6]
		},
		{
			question_id: '9e75e591-89ea-4fc9-918e-6cb53c61bafa',
			question_type: 2,
			sliders: [10, 8, 6, 4, 2]
		},
		{
			question_id: '7ccc93b7-6397-417e-81ff-fa29e16e787a',
			question_type: 2,
			sliders: [10, 9, 8, 7, 6]
		},
		{
			question_id: 'fc47f94f-7e97-4877-9568-8e54259b43f5',
			question_type: 2,
			sliders: [10, 8, 6, 4, 2]
		},
		{
			question_id: '83943acb-347e-4e40-bd9b-8fe61ce29c0f',
			question_type: 1,
			selected: [0, 1, 2, 3, 4]
		},
		{
			question_id: '83943acb-347e-4e40-bd9b-8fe61ce29c0f',
			question_type: 1,
			selected: [1]
		},
		{
			question_id: 'e6696cc2-f2b5-4698-a708-9132a3c151d5',
			question_type: 1,
			selected: [1]
		},
		{
			question_id: '719356d8-e4f1-4c07-9bb7-36f6626ddf97',
			question_type: 1,
			selected: [0, 2, 4]
		},
		{
			question_id: '719356d8-e4f1-4c07-9bb7-36f6626ddf97',
			question_type: 1,
			selected: [0, 2]
		}
	];

	let slider_count = {};
	let questions = {};
	for (const plot of data.poll.plots) {
		for (const question of plot.questions) {
			questions[question.question_id] = question;
		}
	}
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
			// dataset[value.question_id].sort().reverse();
		} else if (value.question_type == 4) {
			if (!Object.hasOwn(dataset, value.question_id)) dataset[value.question_id] = new Array();
			dataset[value.question_id].push(value.text);
		}
	}

	const plot_types = ['bar', 'pie', 'doughnut', 'bar', 'polarArea', 'wordCloud'];

	for (const value of values) add2dataset(value, questions[value.question_id]);

	let charts = data.poll.plots.map((plot) => {
		return {
			ctx: null,
			plot_type: plot.plot_type,
			name: plot.name,
			labels: plot.plot_type == 6 ? [""] : plot.questions[plot.questions.length - 1].options.map((o) => o.label),
			datasets: plot.questions.map((question: any) => {
				return {
					label: question.label,
					data: dataset[question.question_id]
				};
			})
		};
	});

	function createCharts() {
		for (const chart of charts) {
			const ctx = chart.ctx.getContext('2d');
			new Chart(ctx, {
				type: plot_types[chart.plot_type - 1],
				data: {
					labels: chart.labels,
					datasets: chart.datasets
				},
				options: {
					responsive: true,
					plugins: {
						title: {
							display: !!chart.name,
							text: chart.name,
						}
					}
				}
			});
		}
	}

	onMount(() => {
		createCharts();
	});
</script>

<div class="vh-100 container-fluid">
	<h2 class="my-5 text-center">{data.poll.name}</h2>
	{#each charts as chart}
		<canvas bind:this={chart.ctx} class="col" />
	{/each}
</div>
