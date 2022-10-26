function Tabs(props) {
    const { config=[] , onChange, activeTab } = props;
    return (
        <div className="tab-wrapper">
            {
                config.map(tab => <div data-tab-status={activeTab == tab.key} onClick={()=> onChange(tab.key)} className="tab">{tab.display}</div>)
            }

        </div>
    )
}
export default Tabs;