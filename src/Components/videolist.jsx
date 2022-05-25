import React, { Component } from 'react';
import Video from './video';
import Videodetail from './videodetail';
import styles from './videolist_card.module.css'
class VideoList extends Component {
  
 
  showVideo = (item,id,channelId,click) => 
  {
    console.log("5. 비디오리스트에서클릭넘겨주기");
    this.props.showVideo(item,id,channelId,click);
   };

  render() {
    console.log("2. 비디오리스트");    
    return (
      <ul className={styles.video_list}>
        
        {this.props.items.map(item => 
          <Video key={item.id} item={item}
          showVideo={this.showVideo}
          display={this.props.display}
           />
        )}
       
      </ul>
    );
  }
}

export default VideoList;