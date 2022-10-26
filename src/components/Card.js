import { useEffect, useState } from "react";
import "../styles/cards.css"
import Icon from "./Icons";
function Card(props) {
    const [showAll, setShowAll] = useState(false)    
    const { onRemove, removeText, limit} = props;

    const  data =  [
        {
            name:"Eurofins",
            desc:"Rajdeep Das",
            image:""
        },
        {
            name:"Celebal tech",
            desc:"Ruchi Ahuja",
            image:""
        },
        {
            name:"Eucloid",
            desc:"Raghvendra Kushwah",
            image:""
        },
        {
            name:"Eurofins",
            desc:"Rajdeep Das",
            image:""
        },
        {
            name:"Celebal tech",
            desc:"Ruchi Ahuja",
            image:""
        },
        {
            name:"Eucloid",
            desc:"Raghvendra Kushwah",
            image:""
        }
    ]
    let modData = [...data]
    if(showAll) {
        modData = data
    } else if(!showAll && limit) {
        modData = data.slice(0,limit)
    }
    return  (
        <div className="card-wrapper">
            {
                modData.map((record, index) => {
                   return (
                        <div className="hr-card">
                           <div className="card-image"></div>
                            <div className="card-right-section">
                                <div className="detail-wrapper">
                                    <div className="card-title">{record.name}</div>
                                    <div className="card-desc">{record.desc}</div>
                                </div>
                                {
                                    removeText && 
                                    <div className="remove-button">
                                        {removeText}
                                    </div>
                                }
                            </div>
                        </div>  
                   )   
                })
            }
            {
                limit && 
                    <div className="limit-toggle-button" onClick={()=>setShowAll(!showAll)} data-showAll={showAll}>
                        <div>6 Members added by you</div>
                        <div> 
                            {showAll ? "See less" : "See full list"}
                            <Icon type="direction-right" width={12} height={12}/>
                        </div>
                    </div>
            }
        </div>
    )
}
export default Card;