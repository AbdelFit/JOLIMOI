<template>
	<div class="container mt-5 w-75">
		<b-jumbotron>
			<template #header>Nombres Romains</template>

			<template #lead>
				Convertir les nombres décimaux à des nombres romains.
			</template>

			<hr class="my-4">

			<b-row class="my-1">
				<b-col sm="3" class="mt-3">
					<label for="decimalNumber">Entrer un chiffre:</label>
				</b-col>
				<b-col sm="5" class="mt-1">
					<b-form-input v-model="decimalNumber" type="number" id="decimalNumber" size="lg" placeholder="Entre 1 et 100" min=1 max=100></b-form-input>
				</b-col>
				<b-col class="mt-3">
					<b-form-invalid-feedback :state="!error">
						Le chiffre doit être entier et entre 1 et 100 !
					</b-form-invalid-feedback>
				</b-col>
			</b-row>

			<b-button class="mt-3" variant="success" @click.prevent="getRomain">Convertir</b-button>

			<hr class="my-4">

			<h3 class="mt-5">
				Le chiffre en romain est : <span class="text-danger" v-if=!error>{{ romanNumber }}</span>
			</h3>
		</b-jumbotron>
	</div>
</template>

<script>
	export default {
		name: 'roman',

		data() {
			return {
				decimalNumber: null,
				romanNumber: null,
				error: false
			}
		},

		mounted() {
			this.setSSE();
		},

		methods: {
			getRomain() {
				if(this.decimalNumber >= 1 && this.decimalNumber <= 100) {
					this.error = false;
					this.romanNumber = null;

					const options = {
						method: 'POST',
						body: JSON.stringify({'decimalNumber': this.decimalNumber}),
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						}
					};

					this.getResponse('http://localhost:3000/getRoman', options);
				}
				else {
					this.romanNumber = null;
					this.error = true;
				}
			},

			async getResponse(url, options) {
				let res = await fetch(url, options);
				let json = await res.json();
				return json;
			},

			setSSE() {
				const eventSource = new EventSource("http://localhost:3000/sse");

				eventSource.addEventListener("message", (e) => {
					let res = JSON.parse(e.data);
					this.romanNumber = res != 0 ? res : null;
				});
			}
		}
	}
</script>