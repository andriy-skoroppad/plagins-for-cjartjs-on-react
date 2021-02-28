
import Chart from 'chart.js';
import RoughPolarAreaController from './controller';


const plugins = Chart.plugins;



function buildOrUpdateControllers() {
	var me = this;
	var newControllers = [];

	Chart.helpers.each(me.data.datasets, function(dataset, datasetIndex) {
		var meta = me.getDatasetMeta(datasetIndex);
		var type = dataset.type || me.config.type;

		if (meta.type && meta.type !== type) {
			me.destroyDatasetMeta(datasetIndex);
			meta = me.getDatasetMeta(datasetIndex);
		}
		meta.type = type;

		if (meta.controller) {
			meta.controller.updateIndex(datasetIndex);
			meta.controller.linkScales();
		} else {
			var ControllerClass = RoughPolarAreaController;
			if (ControllerClass === undefined) {
				throw new Error('"' + meta.type + '" is not a chart type.');
			}

			meta.controller = new ControllerClass(me, datasetIndex);
			newControllers.push(meta.controller);
		}
	}, me);

	return newControllers;
}





export const semiPolarAreaPlugin = {

	beforeInit: function(chart) {
		chart.buildOrUpdateControllers = buildOrUpdateControllers;


		// Invalidate plugin cache and create new one
		delete chart.$plugins;
		// For Chart.js 2.7.1 backward compatibility
		delete chart._plugins;
		plugins.descriptors(chart);
	}
}