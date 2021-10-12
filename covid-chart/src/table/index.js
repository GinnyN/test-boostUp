const StateTable = ({ data }) => <div className="table">
    
    <table>
        <tbody>
            <tr>
                <th>State Name</th>
                <th>Cases</th>
                <th>Deaths</th>
            </tr>
            {data.slice(0,data.length/2).map((item, index) => <tr key={`1${index}`}>
                <td>{item.state}</td>
                <td>{item.cases}</td>
                <td>{item.deaths}</td>
            </tr>)}
        </tbody>
    </table>
    <table>
        <tbody>
            <tr>
                <th>State Name</th>
                <th>Cases</th>
                <th>Deaths</th>
            </tr>
            {data.slice(data.length/2).map((item, index) => <tr key={`2${index}`}>
                <td>{item.state}</td>
                <td>{item.cases}</td>
                <td>{item.deaths}</td>
            </tr>)}
        </tbody>
    </table>
</div>

export default StateTable;