import { interpret } from "xstate"
import { readable } from "svelte/store"

export function useMachine(machine, options) {
    const service = interpret(machine, options)
    const state = readable(service.initialState, set => {
        service.onTransition(newState => set(newState)).start()
        return service.stop
    })

    return [state, service.send]
}
