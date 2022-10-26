import { useState, useMemo } from 'react';
function PDFViewer(props) {
    const {resume}  = props;

    return useMemo(() => {
        return (
            <embed
                src={typeof resume == "string" ? resume : URL.createObjectURL(resume)}
                width="100%"
                height="580px"
                style={{marginLeft: 10, overflow:"hidden", borderRadius: 8, borderColor:"#D0D5DD"}}
                title="Resume"
            >
            </embed>
        )
    })
}
export default PDFViewer