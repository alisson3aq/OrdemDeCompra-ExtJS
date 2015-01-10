	//var records = [];

		//create extjs store with empty data
		var myStore = Ext.create('Ext.data.Store', {
			fields: ['nome', 'nome_mat', 'marca'],
			data: modified,
			paging: false
		});

		Ext.Ajax.request({
			url: 'php/credores/criarOrdem.php',
			params: {
				max: 10
			},
			success: function(r) {
				//create a json object from the response string
				var res = Ext.decode(r.responseText, true);
				// if we have a valid json object, then process it
				if (res !== null && typeof(res) !== 'undefined') {
					// loop through the data
					Ext.each(res.data, function(obj) {
						//add the records to the array
						records.push({
							nome: obj.get('nome'),
							nome_mat: obj.get('nome_mat'),
							marca: obj.get('marca')
						})
					});
					//update the store with the data that we got
					myStore.loadData(records);
				}
			},
			failure: function(r) {

			}
		});