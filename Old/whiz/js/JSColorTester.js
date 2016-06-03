function add() {
	var count = 100

	for(var i=0; i<count; i++) {
		var input = document.createElement('INPUT')
		input.style.width = '5em'

		// bind jscolor
		var col = new jscolor.color(input)
		//col.fromHSV(6/count*i, 1, 1)
col.fromRGB(1, 1, 1);
		document.getElementById('AAA').appendChild(input)
	}
}

function color(input)
{
    input.element = this;
    return this;
}


