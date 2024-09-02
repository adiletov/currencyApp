import {createStore} from "vuex";
import {currencyModule} from "./modules/currency";

const index = createStore({
    modules: {
        currency: currencyModule
    }
});

export default index;

