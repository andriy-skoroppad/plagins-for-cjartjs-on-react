import Chart, { helpers } from "chart.js";

var PolarAreaController = Chart.controllers.polarArea;

export default PolarAreaController.extend({

    updateElement: function(arc, index, reset) {
        var me = this;
        var chart = me.chart;
        var dataset = me.getDataset();
        var opts = chart.options;
        var animationOpts = opts.animation;
        var scale = chart.scale;
        var labels = chart.data.labels;

        // scale.setCenterPoint(centerX, 0 , centerY * 2, 0);
    
        var centerX = scale.xCenter;
        var centerY = scale.yCenter;
    

        // var negHalfPI = -0.5 * Math.PI;
        var datasetStartAngle = opts.startAngle;
        var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]) * 2;
        var angles = me._angles.slice(0, index); //|| me._angles.slice(0, index - 1).reduse((acum, angle) => acum + angle, opts.startAngle);
        var angle = angles.reduce((acum, angle) => acum + angle, datasetStartAngle) //|| me._angles.slice(0, index - 1).reduse((acum, angle) => acum + angle, opts.startAngle);
        var startAngle = me._starts[index] - angle/2;
        var endAngle = startAngle + (arc.hidden ? 0 : me._angles[index]/2);
    
        var resetRadius = animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]) * 2;
        var options = arc._options || {};
    
        helpers.extend(arc, {
          // Utility
          _datasetIndex: me.index,
          _index: index,
          _scale: scale,
    
          // Desired view properties
          _model: {
            backgroundColor: options.backgroundColor,
            borderColor: options.borderColor,
            borderWidth: options.borderWidth,
            borderAlign: options.borderAlign,
            x: centerX ,
            y: centerY * 2,
            innerRadius: 0,
            outerRadius: reset ? resetRadius : (distance < 10 ? 10 : distance)/*  + 20 */,
            startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
            endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
            label: helpers.valueAtIndexOrDefault(labels, index, labels[index])
          }
        });
    
        arc.pivot();
      },
	
});