


export class Memory {
    memory = []

    addToMemory(state, reward){
        this.memory.push([state, reward])
        console.log(this.memory)
    }


}