import { FilterProvider } from "@/context/FilterContext";
import "@/styles/globals.css";
import QueryProvider from "@/services/QueryProvider";
export default function App({ Component, pageProps }) {
  return (
    <QueryProvider>
      <FilterProvider>
        <Component {...pageProps} />
      </FilterProvider>
    </QueryProvider>
  )
  
}
