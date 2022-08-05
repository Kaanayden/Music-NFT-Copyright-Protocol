import React, {useState, useRef} from "react";
import "./Modal.css";

const Modal = (props)=>{
    const {isOpen,onClose,children} = props;

    const Ref = useRef();
    const handleBackGround = (e)=>{
        if(e.target === Ref.current) {
            onClose(false);
        }
    }
    return(
        isOpen?
        <div className="modal-background" onClick={handleBackGround} ref={Ref}>
            <div className="modal-content">
                <div onClick={()=>onClose(false)} className="close">&times;</div>
                <div>{children}</div>
            </div>
        </div>
        :null
    )
}

export default Modal;