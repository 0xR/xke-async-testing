# Title
## Sub-title

Here is some content...

Note:
This will only display in the notes window.

---

# titel2
``` javascript
// in home.js
import { connect } from 'react-redux'
const Home = React.createClass({
   render() {
    const { message } = this.props;
     return (
       <div>
         <Title render={prev => `${prev} | Redux workshop`}/>
        <p>{ message }</p>
       </div>
     )
   }
 })
const mapStateToProps = ({ message }) => ({ message });
export default connect(mapStateToProps)(Home);
```

vvv

# asdfasdf

---

# titel3
asdasdf
