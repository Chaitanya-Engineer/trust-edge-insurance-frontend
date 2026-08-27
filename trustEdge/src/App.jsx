import AppRouter from "./routes/AppRouter";
import CustomToaster from "./component/core_components/CustomToast/CustomToast";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomToaster />
      <AppRouter />
    </div>
  );
}
