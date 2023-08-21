import React from 'react'

const Modal = ({visible, onClose, todo}) => {
    if (!visible || !todo) return null
  return (
    <div className='modal'>
        <div className='modal-content'>
            <h2>Edit Todo</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type='text' value={todo.title} onChange={(e) => setTitle(e.target.value)}/>
                <input type='text' value={todo.description} onChange={(e) => setTitle(e.target.value)}/>
                <input type='text' value={todo.status} onChange={(e) => setTitle(e.target.value)}/>
                <input type='text' value={todo.deadline} onChange={(e) => setTitle(e.target.value)}/>
                <button type='submit'>Save</button>
                <button type='button' onClick={onClose}>Close</button>
            </form>
        </div>
    </div>
  )
}

export default Modal