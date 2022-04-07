import React, { Component } from 'react';
import styles from './search.module.css'
class InputFiled extends Component {
    inputRef = React.createRef();


    handleSubmit = (e) => {
        e.preventDefault();
        const text = this.inputRef.current.value;
        text && this.props.query(text);
    }
    handlereLoad = () => {
        window.location.reload();
    }
    render() {
        return (
            <form className={styles.form} onSubmit={this.handleSubmit}>
                <div className={styles.logo} onClick={this.handlereLoad}>
                    <img className={styles.img} src="/images/logo.png"></img>
                    <h1 className={styles.text}>Youtube</h1>
                </div>
                <input className={styles.input}
                    type="text"
                    ref={this.inputRef}
                />
                <img className={styles.search} src="/images/search.png"></img>

            </form>
        );
    }
}

export default InputFiled;