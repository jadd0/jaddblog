<script>
	import { onMount } from "svelte";
	import Nav from "../__nav/+page.svelte";

	export let data;
	let users = [];
	let value = [];

	const postQuery = async () => {
		const val = document.getElementById("userInput").value;

		if (val == "") {
			users = [];
			return;
		}

		const rawResponse = await self.fetch("/api/getUsers", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query: val }),
		});
		const h = await rawResponse.json();
		users = h.data;

		// (users)
	};
</script>

<svelte:window on:keyup={postQuery} />

<svelte:head>
	<title>Search</title>
</svelte:head>

<body>
	<Nav username={data.username} />
	<div id="all">
		<div id="container">
			<h1>Search...</h1>
			<div id="inputHolder">
				<input id="userInput" type="text" />
			</div>
			<div id="friendContainer">
				{#each users as user}
				<a href="/@{user}">
					<div id="searchedFriend">
						<h1 id="searchedFriendName">@{user}</h1>
					</div>
				</a>
				{/each}
				{#if users.length == 0}
					<h1 id="nothingDisplay">
						Nothing to display
					</h1>
				{/if}
			</div>
		</div>
	</div>
</body>

<style>
	@font-face {
		font-family: "Jakarta";
		src: url("/fonts/Jakarta.ttf");
	}

	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		height: auto;
		width: 100vw;
		background-color: #141414;
		overflow-x: hidden;
	}

	* {
		font-size: 24px;
		text-align: center;
		color: black;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: Jakarta;
		letter-spacing: -0px !important;
	}

	h1 {
		font-size: 3rem;
		font-weight: 600;
		color: white;
		/* padding-top: 10px; */
		text-align: left;
		margin-left: 5vw;
	}

	a {
		text-decoration: none;
	}

	#all {
		width: 100vw;
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 150;
	}

	#container {
		background: #1b1b1b;
		width: 400px;
		height: 80vh;
		display: grid;
		overflow: hidden;
		border-radius: 20px;
		z-index: 0;
		margin-top: 3vh;
	}

	#searchedFriendName {
		font-size: 25px;
		color: rgb(255, 255, 255);
		font-weight: 500 !important;
		margin: 0 auto;
		overflow: hidden;	
		text-overflow: ellipsis;
		padding: 10px 10px 10px 10px;
		transition: all 0.2s linear;
	}

	#searchedFriendName:hover {
		color: rgb(175, 175, 175);
	}

	#searchedFriend {
		line-height: 65px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 55px;
		border-bottom: solid 2px rgb(92, 92, 92);
	}

	#nothingDisplay {
		font-size: 30px;
	}

	@media (max-width: 460px) {
		#container, #friendContainer {
			width: 325px !important;
		}
	}

	h1 {
		font-size: 50px;
		color: white;
		margin: 0 auto;
		margin-top: 20px;
	}

	#userInput {
		width: 264px;
		height: 40px;
		margin-left: 19px;
		background: #212121;
		color: white;
		text-align: left;
	}

	#inputHolder {
		width: 300px;
		height: 42px;
		position: relative;
		left:0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		/* top: -11%; */
		background: #212121;
		border-radius: 20px;
		color: white;
		text-align: left;
	}

	#friendContainer {
		position: relative;
		top: -1%;
		height: 50vh;
		width: 400px;
		overflow: scroll;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		padding-bottom: 80px;
	}

	a {
		text-decoration: none;
	}
</style>
