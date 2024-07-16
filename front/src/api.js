import axios from "axios";

export const getMenu = ({setMenu}) => {
    axios({
        method: 'get',
        url: `https://menus-api.vercel.app`,
    }).then(response => {
        setMenu(response.data)
        console.log(response.data)
    }).catch(error => {
        console.log('ERROR: ', error)
    })
}
