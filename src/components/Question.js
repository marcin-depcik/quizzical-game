import React from 'react'

export default function Question(props) {
    return <h3 dangerouslySetInnerHTML={{ __html: props.question }} />
}
