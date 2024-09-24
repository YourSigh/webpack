<template>
	<div>
		<h2>{{ currentPath }}</h2>
		<button
			v-if="currentPath !== '根目录'"
			@click="goBack"
		>
			返回上一级
		</button>
		<ul>
			<li
				v-for="item in currentItems"
				:key="item.id"
			>
				<span @click="item.children ? openFolder(item) : null">
					{{ item.name }}
				</span>
				<ul v-if="item.children && isOpen(item)">
					<li
						v-for="child in item.children"
						:key="child.id"
					>
						<span
							@click="child.children ? openFolder(child) : null"
						>
							{{ child.name }}
						</span>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {
			items: [
				{
					id: 1,
					name: "文件夹 1",
					children: [
						{ id: 4, name: "文件 1-1" },
						{
							id: 5,
							name: "文件夹 1-2",
							children: [{ id: 6, name: "文件 1-2-1" }],
						},
					],
				},
				{
					id: 2,
					name: "文件夹 2",
					children: [{ id: 3, name: "文件 2-1" }],
				},
			],
			currentItems: [],
			pathStack: [],
		};
	},
	computed: {
		currentPath() {
			return this.pathStack.length > 0
				? this.pathStack[this.pathStack.length - 1]
				: "根目录";
		},
	},
	methods: {
		openFolder(item) {
			this.pathStack.push(item.name);
			this.currentItems = item.children || [];
		},
		goBack() {
			this.pathStack.pop();
			const parent = this.pathStack[this.pathStack.length - 1];
			const parentItem = this.items.find((item) => item.name === parent);
			this.currentItems = parentItem
				? parentItem.children || []
				: this.items;
		},
		isOpen(item) {
			return this.pathStack.includes(item.name);
		},
	},
	mounted() {
		this.currentItems = this.items;
	},
};
</script>
<style scoped>
ul {
	list-style-type: none;
	padding-left: 20px;
}

span {
	cursor: pointer;
}

span:hover {
	text-decoration: underline;
}
</style>
