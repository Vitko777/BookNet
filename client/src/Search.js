import React, { Component, useState } from 'react';
import app from "./base.js";
import axios from "axios";
import styles from "./search.module.css"

let defaultBookPic = "https://static.vecteezy.com/system/resources/thumbnails/000/365/820/small/Basic_Elements__2818_29.jpg"



function Search() {
        const[book, setBook] = useState("");
        const[result, setResult] = useState([]);
        const[apiKey, setApiKey] = useState("AIzaSyDRic7TFZjyUeYGPtUo0UVj1Wzx1oXhAsc");
        function handleChange(event) {
            const book = event.target.value;
            setBook(book);
        }
        function handleSubmit(event){
            event.preventDefault();
            axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+"&key=" + apiKey+"&maxResults=40")
            .then(data=> {
                console.log(data);
                setResult(data.data.items);
            })
        }
        //setBooksNeeded("998", "Book of Life", "John Deere");
        return (
            <body className="landing">
            <div>
                <h1>Book Search App</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input onChange={handleChange} type="text" placeholder="Search for Books" autoComplete="off"/>
                    </div>
                    <button className={styles.tester} type="submit">Search</button>
                </form>
                {result.map(book => (
                    <button>
                        <button onClick={ (e) => { setBooksNeeded(e, book.id, book.volumeInfo.title, book.volumeInfo.authors)}}> Book Needed</button>
                    
                        <img src={((book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : defaultBookPic)} />

                        <button onClick={ (e) => { setBooksAvailable(e, book.id, book.volumeInfo.title, book.volumeInfo.authors)}}> Book Available
                       
                        <input type="checkbox" class="hidden" name="trade" readonly="" tabindex="0" />
                        <label>For Trade</label>

                        <input type="checkbox" class="hidden" name="donation" readonly="" tabindex="0" />
                        <label>For Donation</label>

                        <input type="checkbox" class="hidden" name="sale" readonly="" tabindex="0" />
                        <label>For Sale</label>
                        
                        </button>
                    </button>
                   
                ))}
            </div>
            </body>
        );
    }


    function setBooksNeeded(e, book_id, book_title, book_authors) {   
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                axios.post('/api/setBooksNeeded', {
                    userid: user.uid,
                    bookID: book_id,
                    title: book_title,
                    author: book_authors,
                    event: e
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        });
    }
function setBooksAvailable(e, book_id, book_title, book_authors) {
    app.auth().onAuthStateChanged(function (user) {
        if (user) {
            var sale = document.getElementById("sale")
            var donate = document.getElementById("donation")
            var trade = document.getElementById("trade")

            if (sale == null) {
                sale = false;
            }
            else {
                sale = true;
            }

            if (donate == null) {
                donate = false;
            }
            else {
                donate = true;
            }

            if (trade == null) {
                trade = false;
            }
            else {
                trade = true;
            }
            console.log(sale)
            axios.post('/api/setBooksAvailable', {
                userid: user.uid,
                    bookID: book_id,
                    title: book_title,
                    author: book_authors,
                    sale: sale,
                    donate: donate,
                    trade: trade,
                    event: e
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    });
}

export default Search