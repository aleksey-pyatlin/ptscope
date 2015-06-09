// TODO:
// * Mark red "blocked"
// * Add select all button to have better export approach
// * Calculate point: 
// 		- total in sprint
//      - completed	
//		- in progress

// - Automate changes reload with affected side
// - find better debug approach


var teamRefactor = ['AP', 'AB', 'YU'];

function onLinksAdded(links) {
	var listLinks = links[0].added;
	listLinks.forEach(filterTicket);
	
	//var detailsLinks = links[1].added;
	//detailsLinks.forEach(buildTitleListener);
};

function inTeam(members) {
	var result = false;

	teamRefactor.forEach(function(x) {
		members.forEach(function(y) {
			if(x === y){
				result = true;
				return;
			}				
		});
	})	

	return result;
}

function isBlocked(ticket){
	// TODO: A.P. Use jquery selector css class span > a.std.label
	return ticket.title.match(/blocked/gm);
}

function extractTicketInfo(element){
	var labels = [];
	var ticket =  {
			title: element.innerText, 
			//TODO A.P. Complete this.
			members: ['AP'],
			labels: labels, 
			getBlocked: function() {
				return _.contains(this.labels, 'blocked');
			},
			toString: function() {
				return {
					blocked : this.getBlocked()
				};
			}
	};
	
	if(isBlocked(ticket)){
		labels.push('blocked');
	}	

	return ticket;
}

function applyStyle (ticket, el) {
	//TODO: A.P. how to use getter?
	if(ticket.getBlocked())
		el.find('.name.tracker_markup').css('background-color', '#ef3d47');
}

function filterTicket(element) {
	var releaseFind = false;
	var el = $(element);
	var hasRelease = el.hasClass('release');
	if(!hasRelease){
		if(releaseFind){q
			el.hide();
		}else{
			var ticket = extractTicketInfo(element);
			console.log(ticket.toString());
			applyStyle(ticket, el);

			var hasTeam = ticket.title.match(/team refactor/gm);
			if (hasTeam == null) {
				el.hide();
			}
			//$(element).parens

			if(!inTeam(ticket.members)){
				el.hide();
			}
		}		
	}	
	else{
		if(!releaseFind)
			releaseFind = true;
	}
}

// function buildTitleListener(titleElement) {
// 	new MutationSummary({
// 		rootNode: titleElement,
// 		callback: function(changes) {
// 			filterTicket(titleElement);
// 		},
// 		queries: [
// 			{ characterData: true }
// 		]
// 	});
// }

var observer = new MutationSummary({
	callback: onLinksAdded,
	queries: [
		{ element: 'div.story.item' }
	]
});