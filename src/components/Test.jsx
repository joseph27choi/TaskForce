import React from 'react'

const Test = () => {

    const handleContextMenu = (e) => {
        e.preventDefault();

        const { clientX, clientY } = e;
        const rect = e.target.getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
            console.log("Right Click");
        }
    }

    return (
        <>
            <div>
                Context menu
                <div onContextMenu={handleContextMenu}>Test</div>
            </div>
        </>
    )
}

export default Test