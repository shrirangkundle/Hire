import { Fragment } from "react";
import _ from "underscore";
import Icon from "../../../components/Icons";

function Box(props) {
    let {data, template} = props;
    if(template== "template-1") {
        return (
           <Fragment>
               {
                   _.map(data, rec => {
                       return (
                        <div className="overview-box" template={template}>
                           <div className="box-title">{rec.key}</div>
                           <div className="value-change-wrapper">
                                <div className="box-value">{rec.value}</div>
                                <div className="box-change" data-status={rec.arrow_dir}>
                                    <Icon type={rec.arrow_dir} width={10} height={15}/>
                                    {rec.change_value}
                                </div>
                            </div>
                        </div>
                       )
                   })
               }
           </Fragment>
        )
    } else {
        return (
            <Fragment>
                {
                    _.map(data, rec => {
                        return (
                         <div className="overview-box" template={template}>
                            <Icon type={rec.icon || "clock"} width={45} height={45}/>
                            <div className="value-change-wrapper">
                                 <div className="box-value">
                                     {rec.value}
                                     {rec.unit && <div className="value-unit">{rec.unit}</div>}
                                 </div>
                             </div>
                            <div className="box-title">{rec.key}</div>
                         </div>
                        )
                    })
                }
            </Fragment>
         )
    }
}
export default Box