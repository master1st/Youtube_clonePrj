import React, { Component } from 'react';
import styles from './card.module.css'
class Videodetail extends Component {
constructor(props){
    super(props);
}
    
    render() {
        // console.log(this.props.channel[0].snippet)
        const url = "http://www.youtube.com/embed/"
        const src = url.concat(this.props.videoId)
        console.log(this.props.channel[0].snippet)
        // const tags = [...this.props.channel[0].snippet.tags]
        // const snippet = channel[0].snippet
        // console.log(snippet.thumbnails.default.url)
        return (
            <div className={styles.videomove}>
                <iframe id="player" type="text/html" width="1000" height="570"
                    src={src}
                    frameborder="0"></iframe>
                <h1 className={styles.text}>{this.props.video[0].snippet.title}</h1>
                {/* <p className={styles.text}>{`${tags[0]} ${tags[1]} ${tags[2]}`}</p> */}
                {/* <div className={styles.hrtags}></div>
                <img src={snippet.thumbnails.default.url}></img> */}
                <h3 className={styles.text}>{this.props.video[0].snippet.channelTitle}</h3>
                <span className={styles.text}>{this.props.video[0].snippet.publishedAt}</span>
                <p className={styles.text}>{this.props.video[0].snippet.description}</p>
            </div>
        );
    }
}

export default Videodetail;