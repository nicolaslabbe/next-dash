import React from 'react'

class Video extends React.Component {
  render () {
  	var { id, type } = this.props
    return (
    	<div className="video">
	    	{type.toLowerCase() == 'youtube'
		    	? <iframe
		    		className="youtube"
		    		width="100%"
		    		src={`https://www.youtube.com/embed/${id}`}
		    		frameBorder="0"
		    		allowFullScreen></iframe>
				: null }
    	</div>
    )
  }
}

// <iframe width="560" height="315" src="https://www.youtube.com/embed/ue80QwXMRHg" frameborder="0" allowfullscreen></iframe>

export default Video