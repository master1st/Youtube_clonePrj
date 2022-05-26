import React, { Component } from 'react';
import styles from './card.module.css'
class Videodetail extends Component {
constructor(props){
    super(props);
}
    render() {
        const url = "http://www.youtube.com/embed/"
        const src = url.concat(this.props.videoId);
        const subscriber = this.props.subscriber[0];
        console.log(subscriber);
        // var i=10;
        // var j=0;
        // var viewcount = "";
        // for(i=10; i<subscriber.statistics.viewCount; subscriber.statistics.viewCount/i){
        //     j++;
        //     if(j==9){
        //         viewcount = subscriber.statistics.viewCount.slice(0,-9).concat("억");
        //     }
        // }
        // console.log(viewcount);

       
        return (
            <div className={styles.videomove}>
                <iframe id="player" type="text/html" width="1000" height="570"
                    src={src}
                    frameborder="0"></iframe>
                <h1 className={styles.text}>{this.props.video[0].snippet.title}</h1>
                <div className={styles.hrtags}></div>
                <span className={styles.viewCount}>{'조회수 ' + subscriber.statistics.viewCount +'회        '}</span>
                <span className={styles.text}>{this.props.video[0].snippet.publishedAt.slice(0,-10)}</span>
                <hr></hr>
                <div className={styles.profile_container}>
                <div className={styles.profile_item1}>
                <span><img className={styles.img} src={subscriber.snippet.thumbnails.default.url}></img></span>
                </div> 
                <div className={styles.profile_item2}>
                <h3 className={styles.subscriberTitle}>{subscriber.snippet.localized.title}</h3>
                <p className={styles.subscriber}>{'구독자 ' + subscriber.statistics.subscriberCount.slice(0,-4).concat("만명")}</p>
                <p className={styles.description}>{subscriber.snippet.localized.description}</p>
                <p className={styles.text}>{this.props.video[0].snippet.description}</p>
                </div>
                </div>
            </div>
        );
        
    }
}

export default Videodetail;