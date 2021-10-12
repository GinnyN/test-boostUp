import { useRef, useEffect } from 'react';
import moment from 'moment';
import * as d3 from 'd3';

const Histogram = ({ data, onClick }) => {
    const refDiv = useRef();

    useEffect(() => {
        console.log(data);
        if(!data.cases || data.cases.length < 0) return;
        const dataXArray = data.cases.map((item) => moment(item.date, 'YYYY/MM/DD'));
        const dataYArray = data.cases.map((item) => item.value)
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = 660 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
        d3.select(refDiv.current).select('svg').remove();
        // append the svg object to the body of the page
        var svg = d3.select(refDiv.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // X axis: scale and draw:
        var x = d3.scaleTime()
        .domain([d3.min(dataXArray), d3.max(dataXArray)])
        .range([0, width]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(function(d) { return moment(d).format('MM/DD/YY')}));

        // Add Y axis
        const formatValue = d3.format(".2s");
        var y = d3.scaleLinear()
            .domain([0, d3.max(dataYArray)])
            .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d) { return formatValue(d)}));

        // Bars
        svg.selectAll("mybar")
        .data(data.cases)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(moment(d.date, 'YYYY/MM/DD')); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", function(d) { return width / data.cases.length })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "#69b3a2")
        .on("click", function(event, datum) { onClick(datum.date) });

        svg.selectAll("mybar")
        .data(data.deaths)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(moment(d.date, 'YYYY/MM/DD')); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", function(d) { return width / data.deaths.length })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "#FFDFD3")
        .on("click", function(event, datum) { onClick(datum.date) });;

    }, [data]);

    return <div ref={refDiv} />
}

export default Histogram;