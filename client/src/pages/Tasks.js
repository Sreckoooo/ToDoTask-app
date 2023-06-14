import React, { useState, useEffect } from "react";
import "../styles/Tasks.css";
import { useQueryClient, useMutation, useQuery } from "react-query";
import axios from "axios";
import { EditTodoForm } from "../helpers/EditTodoForm";
import Search from "../pages/SearchBar"


const Tasks = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1);
    const [editId, setEditid] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 600);

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

    const { isLoading, data } = useQuery({
        queryKey: ['todos', page, debouncedSearchTerm],
        queryFn: async () => {
            return axios.get('/api/task?page=' + page + "&search=" + encodeURIComponent(debouncedSearchTerm))
        }
    })

    const completeMutation = useMutation({
        mutationFn: (Complete) =>
            axios.put(`/api/task/` + Complete._id, Complete),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        }
    });

    const handlePreviousPage = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1], day = datePart[2];
      
        return day+'/'+month+'/'+year;
      }
      
      formatDate ('2010/01/18'); // "18/01/10"


    return (
        <div className="tasks-container">
            <h1 className="tasks-title">All Tasks</h1>
            <Search onChange={setSearchTerm} searchTerm={searchTerm} />
            {!isLoading && data && <>

                <ul className="tasks-list">
                    {data.data.data.map((todo) => {
                        if (todo._id === editId) {
                            return <EditTodoForm key={todo._id} task={todo} onCancel={() => setEditid("")} onSubmit={(taskText, taskDate) => {
                                updatetask.mutate({ id: todo._id, task: taskText, active: todo.active, dueDate: taskDate })

                            }} />
                        }
                        return <li key={todo._id} className="tasks-item">
                            {todo.active ? (
                                <input type="checkbox" onClick={() => completeMutation.mutate({ ...todo, active: !todo.active })} checked={true} onChange={() => { }} />
                            ) : (
                                <input type="checkbox" onClick={() => completeMutation.mutate({ ...todo, active: !todo.active })} checked={false} onChange={() => { }} />
                            )}
                            <div>{todo.task}</div>
                            <div>{new Date(todo.dueDate).toLocaleDateString()}</div>
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
            </>}
        </div>

    );
};

const useDebouncedValue = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  };


export default Tasks;
