import styles from './app.module.css';
import React, { Component } from 'react';
import VideoList from './Components/videolist';
import InputFiled from './Components/inputFiled';
import Videodetail from './Components/videodetail';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      id : '0' , item : false,
      channelId : '0',
      itemss: [],
      click: false,
      compo: false,
      detailItem : [],
    };
  }
// showVideo -> 검색한것이 보여지는 detail view  
// 에러나는 것은 Snippet , component DidUnMount되었을때, 즉 컴포넌트가 아직 View에 Rendering 되지않았을때, 아무래도 화면에 관한 UI 로직을 불러와서 문제가 되는 것
// 로직은 search 랑 똑같다. 검색하고나서, submit 폼을 보냈을때, 상위 App 컴포넌트에서 하위컴포넌트로 받은 값을 토대로 req를 날리는 것은 똑같다. 
// 내가 할일은 video가 클릭했을때 보낸 item과 데이터들이, json 형식으로 맞게 channlId를 얻었는지 확인,
// 두번째는 그 item을 showVideo로 검색하는데 잘쓰고, 그것에 대한 반환결과를 아래 return 에 맞는 state id 를 사용했는지. 
  //처음에 보여지는 인기차트 
  
  componentDidMount() {
    console.log("1. 인기차트 보여주기");
    fetch("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCLyt5QUm5cWIxi2lQZTZ5YjfrmJviMPqI&part=snippet&chart=mostPopular&maxResults=25")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
     
  }
  showVideo = (item,id,channelId,click) => {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=AIzaSyCLyt5QUm5cWIxi2lQZTZ5YjfrmJviMPqI`)
    .then(res => res.json())
    .then(
      (result) => {
        
    console.log("6. showvideo json req날리기");
        this.setState({
          isLoaded: true,
          itemss: result.items,
          compo: true,
        });
      },(error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    item && this.setState({detailItem : item, id , channelId:channelId, click });
  }
  // 검색 JSON -> 유튜브 API 
  inputFiled = (text) => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCLyt5QUm5cWIxi2lQZTZ5YjfrmJviMPqI&part=snippet&maxResults=25&type=video&q=${text}`)
      .then(res => res.json())
      .then(result =>
        result.items.map(item => ({ ...item, id: item.id.videoId }))
      )
      .then(items =>
        this.setState({
          items: items,
        }))
  }
  // componentWillUnmount() {
  //   fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${this.state.channelId}&key=AIzaSyCLyt5QUm5cWIxi2lQZTZ5YjfrmJviMPqI`)
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       console.log(result.items)
  //       this.setState({
  //         isLoaded: true,
  //         itemss: result.items,
  //       });
  //     },
  //     (error) => {
  //       this.setState({
  //         isLoaded: true,
  //         error
  //       });
  //     }
  //   )
  // }
  //아래부분 json의 데이터를 map을 이용해 변형시켜 처리한 부분은 배울점.
  //then 안에서의 자유로운 코드작성 및 변형

  render() {
    let showVideoVar;
    if(this.state.item === undefined) {return}
      const video = this.state.items.filter(item => item.id === this.state.id);
      const subscriber = this.state.itemss.filter(item => item.id === this.state.channelId);
     

    const { error, isLoaded, items, detailItem } = this.state;
    return (
      <div className={styles.app}>
        <InputFiled query={this.inputFiled} />
        <section className={styles.content}>
          {this.state.compo && <Videodetail videoId={this.state.id} video={video} subscriber={subscriber}/>}
          <div className={styles.list}>
          <VideoList items={items} showVideo={this.showVideo}
          display={this.state.item ? 'list' : 'grid' }/>
          </div>
        </section>
      </div>
    );
  }
}


export default App;
