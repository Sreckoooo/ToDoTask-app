import React, { useState } from "react";
import "../styles/Tasks.css";
import { useQueryClient, useMutation, useQuery } from "react-query";
import axios from "axios";
import { EditTodoForm } from "../helpers/EditTodoForm";


const Tasks = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1);
    const [editId, setEditid] = useState("");

    const updatetask = useMutation({
        mutationFn: (Update) =>
            axios.put('/api/task/' + Update.id, Update),
        onSuccess: () => {
            setEditid("")
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })

    const deletetask = useMutation({
        mutationFn: (id) =>
            axios.delete('/api/task/' + id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            });
        }
    })

    const { isLoading, error, data } = useQuery({
        queryKey: ['todos', page],
        queryFn: async () => {
            return axios.get('/api/task')
        }
    })

    const completeMutation = useMutation({
        mutationFn: (Complete) =>
            axios.put(`/api/task/` + Complete._id, Complete),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        }
    });

    if (isLoading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>error: {error}</div>
    }
    console.log(data)

    const handlePreviousPage = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };


    return (
        <div className="tasks-container">
            <h1 className="tasks-title">All Tasks</h1>
            <ul className="tasks-list">
                {data.data.data.map((todo) => {
                    if (todo._id === editId) {
                        return <EditTodoForm key={todo._id} task={todo} onCancel={() => setEditid("")} onSubmit={(taskText) => {
                            updatetask.mutate({ id: todo._id, task: taskText, active: todo.active })

                        }} />
                    }
                    return <li key={todo._id} className="tasks-item">
                        {todo.active ? (
                            <input type="checkbox" onClick={() => completeMutation.mutate({ ...todo, active: !todo.active })} checked={true} onChange={() => { }} />
                        ) : (
                            <input type="checkbox" onClick={() => completeMutation.mutate({ ...todo, active: !todo.active })} checked={false} onChange={() => { }} />
                        )}
                        {todo.task}
                        <div className="button-container">
                            <button
                                type="submit"
                                className="edit-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setEditid(todo._id);
                                }}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => deletetask.mutate(todo._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                }
                )}
            </ul>
            <div className="pagination">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="pagination-button"
                >
                    Prejšnja
                </button>
                <span className="page-info">Stran {page}</span>
                <button
                    onClick={handleNextPage}
                    disabled={!data.next}
                    className="pagination-button"
                >
                    Naslednja
                </button>
            </div>
        </div>

    );
};

export default Tasks;
