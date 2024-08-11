
<script>
    let show = false;
    let items = ["Item - 1", "Item - 2", "Item - 3", "Item - 4", "Item - 5", "Item - 6"];
</script>

{#if show}
    <ul>
        {#each items as item}
            <li>{item}</li>
        {/each}
    </ul>
{/if}

<button on:click={() => show = !show}>
    {show ? 'Hide' : 'Show'} Items
</button>
<h1> Another set:</h1>
<div>
    {#if show}
    <h1> Show is open</h1>
    <div>
        {#each items as item }
            <h1> {item}</h1>
        {/each}
    </div>
    {:else}
    <h1>Show is closed</h1>
    
    {/if}
</div>
