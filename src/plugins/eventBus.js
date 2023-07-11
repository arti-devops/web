// Import the useEventBus function from @vueuse/core
import { useEventBus } from '@vueuse/core'

// Create an event bus
const bus = useEventBus('news')

// Export the bus so it can be used in other files
export { bus }
