<template>
    <div class="ToDo">
        <div class="container has-text-centered">
            <p class="title mb-4">Lista de pendientes</p>
        </div>

        <div class="container">
            <div class="columns is-centered">
                <div class="column is-6 is-offset-4">
                    <b-field>
                        <b-input class="is-full" v-model="newTask" @keyup.enter="addTask" placeholder="Agregar nueva tarea"
                            rounded></b-input>
                    </b-field>
                </div>
                <div class="column is-6">
                    <b-field>
                        <b-button @click="addTask" rounded>Agregar</b-button>
                    </b-field>
                </div>
            </div>
            <div class="columns is-centered mt-4">
                <div class="column">
                    <table class="table is-fullwidth is-striped is-hoverable" v-show="tasks.length > 0">
                        <thead>
                            <tr>
                                <th class="has-text-centered index-custom-width">Index</th>
                                <th class="has-text-centered tasks-custom-width">Tarea</th>
                                <th class="has-text-centered actions-custom-width">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(task, index) in sortedTasks" :key="index" class="has-text-centered">

                                <td :class="{ done: task.completed }" class="is-vcentered"> {{ task.index }} </td>

                                <td v-if="!task.editing" :class="{ completed: task.completed }" class="is-vcentered"
                                    @dblclick="startEditing(index)">
                                    {{ task.text }}
                                </td>
                                <td v-else>
                                    <b-input v-model="task.text" @blur="finishEditing(index)"
                                        @keyup.enter="finishEditing(index)">
                                    </b-input>
                                </td>


                                <td class="has-text-centered" :class="{ done: task.completed }">
                                    <div class="buttons is-centered">
                                        <b-button id="Completar" @click="toggleTaskStatus(index)" v-if="!task.editing"
                                            type="is-success" class="custom-margin">
                                            {{ task.completed ? 'Incompleta' : 'Completada' }}
                                        </b-button>

                                        <b-button id="Editar" @click="editTask(index)" v-if="!task.editing" type="is-info"
                                            class="custom-margin">
                                            Editar
                                        </b-button>

                                        <b-button id="Eliminar" @click="deleteTask(index)" v-if="!task.editing"
                                            type="is-danger" class="custom-margin">
                                            Eliminar
                                        </b-button>

                                        <b-button @click="finishEditing(index)" v-if="task.editing" type="is-success"
                                            class="custom-margin">Aceptar
                                        </b-button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="container has-text-centered">
            <div class="columns is-centered">
                <div class="column is-full">
                    <p v-show="tasks.length === 0">No tienes tareas pendientes.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Todo',
    data() {
        return {
            newTask: '',
            tasks: [],
            currentIndex: 0
        };
    },
    computed: {
        sortedTasks() {
            return this.tasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
        },
    },
    methods: {
        addTask() {
            if (this.newTask.trim() === '') return;
            if (this.tasks.length === 0) this.currentIndex = 0;
            const newIndex = this.currentIndex + 1;
            this.tasks.push({ index: newIndex, text: this.newTask.trim(), completed: false, editing: false });
            this.newTask = '';
            this.currentIndex++;
        },
        startEditing(index) {
            this.tasks[index].editing = true;
        },
        finishEditing(index) {
            this.tasks[index].editing = false;
            this.tasks[index].text = this.tasks[index].text.trim();
        },
        editTask(index) {
            if (!this.tasks[index].editing) {
                this.startEditing(index);
            } else {
                this.finishEditing(index);
            }
        },
        toggleTaskStatus(index) {
            this.tasks[index].completed = !this.tasks[index].completed;
        },
        deleteTask(index) {
            if (confirm('¿Eliminar tarea?')) {
                this.tasks.splice(index, 1);
            }
        },
    },
};
</script>

<style>
.completed {
    text-decoration: line-through;
    background-color: dimgray;
}

.done {
    background-color: dimgray;
}

.custom-margin {
    margin: 1px;
}

.task-custom-width {
    width: 500px;
}

.actions-custom-width {
    width: 450px;
}

.index-custom-width {
    width: 150px;
}
</style>