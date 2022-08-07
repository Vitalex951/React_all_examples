import React from 'react';
import mc from './MyModal.module.css'

type MyModalPropsType = {
    children?: React.ReactNode
    setVisible: (modal: boolean) => void
    visible: boolean
}
export const MyModal: React.FC<MyModalPropsType> = ({children, visible, setVisible}) => {

    const rootClasses = [mc.myModal]
    if (visible) {
        rootClasses.push(mc.active)
    }
    const hideModalOnClickHandler = () => {
        setVisible(false)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={hideModalOnClickHandler}>
            <div className={mc.myModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
