import * as d3 from 'd3';

const responsivefy = svg => {
  const container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style('width')),
    height = parseInt(svg.style('height')),
    aspect = width / height,
    resize = () => {
      let targetWidth = parseInt(container.style('width'));
      svg.attr('width', targetWidth);
      svg.attr('height', Math.round(targetWidth / aspect));
    };

  svg
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('perserveAspectRatio', 'xMinYMid')
    .call(resize);

  d3.select(window).on(`resize.${container.attr('id')}`, resize);
};

export default responsivefy;
