<script>
    import { onMount } from 'svelte';
    let todos = [];
    let newTodo = '';

    onMount(async () => {
        const res = await fetch('/api/todos');
        const data = await res.json();
        todos = data.todos;
    });

    async function addTodo() {
        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newTodo })
        });
        const data = await res.json();
        todos = [...todos, data.todo];
        newTodo = '';
    }
</script>

<main>
    <h1>Todo List</h1>
    <input bind:value={newTodo} placeholder="New todo" />
    <button on:click={addTodo}>Add</button>
    <ul>
        {#each todos as todo}
            <li>{todo.text}</li>
        {/each}
    </ul>
</main>

<style>
    /* CSS code here */
</style>
