import React from 'react'

export default function Answer(props) {
    const styles = {
        backgroundColor: `${props.answerColor}`,
        borderColor: '#293264',
        order: `${props.order}`,
    }

    return (
        <button
            type="button"
            style={styles}
            className={props.isSelected ? 'btn--answer selected' : 'btn--answer'}
            onClick={props.handleClick}
            dangerouslySetInnerHTML={{ __html: props.answer }}
        />
    )
}
