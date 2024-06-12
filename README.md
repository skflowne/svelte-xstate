# svelte-xstate

## Installation

```
npm i --save-dev svelte-xstate
```

## Usage

Assuming you have an xstate machine defined at `../machines/myMachine`

```
<script>
    import machine from '../machines/myMachine'
    import { useMachine } from 'svelte-xstate'

    let [state, send] = useMachine(machine.withConfig({}, { todos: [] }))

    let todos
    $: todos = $state.context.todos

    let addTodo = todo => {
        send('ADD_TODO', todo)
    }
</script>

<div>
    Current state : {$state.value}
</div>

{#if $state.matches('LOADING')}
    <span>Loading...</span>
{/if}
```

`state` is a svelte store so you need to use \$state when accessing it
`send` is simply the `service.send` method of the xstate machine

## Possible gotcha

It seems there are some problems with Rollup/Svelte/xstate because of the process variable not being defined

Hopefully there is a rather easy fix, thanks to [RikuVan's config file](https://github.com/RikuVan/svelte3-ts-starter/blob/861ae9eb4f840edb92d50beb17d3afb1d30770a3/rollup.config.js#L56-L58)

You just need to add `rollup-plugin-replace`

```
npm i --save-dev rollup-plugin-replace
```

Then call it in the plugins array, after svelte :

```
replace({
    "process.env.NODE_ENV": production
        ? JSON.stringify("production")
        : JSON.stringify("development")
}),
```

You can learn in this [xstate issue](https://github.com/davidkpiano/xstate/issues/443)
