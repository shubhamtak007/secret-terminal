import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LoadingBar from '@/components/layout/loading-bar';
import { UserContextProvider } from "@/contexts/user.context";
import { LoadingContextProvider } from '@/contexts/loading.context';
import { TouchDetectorContextProvider } from "@/contexts/touch-detector.context";

export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="body-wrapper">
            <LoadingContextProvider>
                <LoadingBar>
                    <UserContextProvider>
                        <TouchDetectorContextProvider>
                            <Header />

                            <main className="main-content">
                                <div className="container">
                                    {children}
                                </div>
                            </main>

                            <Footer />
                        </TouchDetectorContextProvider>
                    </UserContextProvider>
                </LoadingBar>
            </LoadingContextProvider>
        </div>
    );
}
