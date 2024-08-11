<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let todos = writable([]);
  let newTodoTitle = '';
  let editTodoId = null;
  let editTodoTitle = '';

  // Get (fetch) all todos from the API
  async function fetchTodos() {
      const res = await fetch('/api/get-todo');
      let data = await res.json();
      
      // Sort todos so that the most recently created is first
      data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      todos.set(data);
  }

  // Add a new todo to the list
  async function addTodo() {
      if (newTodoTitle.trim() === '') return;

      const res = await fetch('/api/add-todo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newTodoTitle })
      });

      if (res.ok) {
          newTodoTitle = '';
          fetchTodos();
      }
  }

  // Edit an existing todo
  async function editTodo() {
      if (editTodoTitle.trim() === '') return;

      const res = await fetch('/api/edit-todo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: editTodoId, title: editTodoTitle })
      });

      if (res.ok) {
          editTodoId = null;
          editTodoTitle = '';
          fetchTodos();
      }
  }

  // Delete a todo
  async function deleteTodo(id) {
      const res = await fetch('/api/delete-todo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
      });

      if (res.ok) {
          fetchTodos();
      }
  }

  // Runs when the component is mounted
  onMount(() => {
      fetchTodos();
  });

  // Function to format the date
  function formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('sv-SE', options);
  }

</script>

<main class="max-w-lg mx-auto p-6 font-sans">
  <h1 class="text-2xl font-bold mb-6">Todo App</h1>

  <!-- Section to add a new todo -->
  <section class="mb-6">
      <input
          type="text"
          bind:value={newTodoTitle}
          placeholder="Enter a new todo"
          class="border border-gray-300 p-2 rounded-md mr-2 w-3/4"
      />
      <button
          on:click={addTodo}
          class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
          Add Todo
      </button>
  </section>

  <!-- List of existing todos -->
  <ul>
      {#each $todos as todo}
          <li class="flex justify-between items-center mb-4">
              {#if editTodoId === todo._id}
                  <input
                      type="text"
                      bind:value={editTodoTitle}
                      placeholder="Edit todo title"
                      class="border border-gray-300 p-2 rounded-md w-3/4 mr-2"
                  />
                  <button
                      on:click={editTodo}
                      class="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mr-2"
                  >
                      Save
                  </button>
                  <button
                      on:click={() => { editTodoId = null; editTodoTitle = ''; }}
                      class="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                  >
                      Cancel
                  </button>
              {:else}
                  <div class="flex-1 mr-4">
                      <span class="block font-semibold">{todo.title}</span>
                      <span class="block text-sm text-gray-500">Created: {formatDate(todo.createdAt)}</span>
                  </div>
                  <button
                      on:click={() => { editTodoId = todo._id; editTodoTitle = todo.title; }}
                      class="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 mr-2"
                  >
                      Edit
                  </button>
                  <button
                      on:click={() => deleteTodo(todo._id)}
                      class="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                      Delete
                  </button>
              {/if}
          </li>
      {/each}
  </ul>
</main>
