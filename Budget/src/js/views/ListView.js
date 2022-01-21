export class ListView{
    render(data) {
        this.data = data;
        const html = this.generateHTMLString();
        this.container.innerHTML = html;
    }

    pushTransactionInContainer(transaction){
        this.container.insertAdjacentHTML(
            "afterbegin", 
            this.generateCardHTML(transaction)
        );
    }

    addFilterChangeListener(handler){
        this.filterSelect.addEventListener("change",(e)=>{
            handler(e);
        });
    }

    generateCardHTML(transaction){
        return `<div class="transaction_card">
            <div class=${transaction.type==="EXPENSE" ? "red" : "green"}>Rs ${transaction.value}</div>
            <div>${this.formatTimestamp(transaction.timestamp)}</div>
        </div>`;
    }

    formatTimestamp(timestamp){
        // console.log(timestamp)
        // console.log(new Date())
        return new Date(timestamp).toDateString();
    }

    generateHTMLString(){
        const data = this.data;
        let html = "";
        if(Array.isArray(data)){
            data.forEach(transaction => {
                html += this.generateCardHTML(transaction);
            });
        }
        return html;
    }

};