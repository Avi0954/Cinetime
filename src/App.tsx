import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AdminLayout } from './components/Admin/AdminLayout';
import { AdminLogin } from './pages/Admin/Login';
import { AdminDashboard } from './pages/Admin/Dashboard';
import { MovieEditor } from './pages/Admin/MovieEditor';
import { PublicLayout } from './components/Layout/PublicLayout';
import { SearchProvider } from './context/SearchContext';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { DMCAPolicyPage } from './pages/DMCAPolicyPage';
import { APIAccessPage } from './pages/APIAccessPage';
import { ReleasesPage } from './pages/ReleasesPage';
import { UpcomingPage } from './pages/UpcomingPage';
import { TrendingPage } from './pages/TrendingPage';
import { DiscoverListPage } from './pages/DiscoverListPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { RemindersPage } from './pages/RemindersPage';
import { TimezoneSyncPage } from './pages/TimezoneSyncPage';
import { MyListProvider } from './context/MyListContext';
import { MyListPage } from './pages/MyListPage';
import { ScrollToTop } from './components/common/ScrollToTop';

function App() {
    return (
        <SearchProvider>
            <MyListProvider>
                <BrowserRouter>
                    <ScrollToTop />
                    <Routes>
                        {/* Public Frontend */}
                        <Route path="/" element={
                            <PublicLayout>
                                <HomePage />
                            </PublicLayout>
                        } />
                        <Route path="/trending" element={
                            <PublicLayout>
                                <TrendingPage />
                            </PublicLayout>
                        } />

                        <Route path="/releases" element={
                            <PublicLayout>
                                <ReleasesPage />
                            </PublicLayout>
                        } />
                        <Route path="/upcoming" element={
                            <PublicLayout>
                                <UpcomingPage />
                            </PublicLayout>
                        } />
                        <Route path="/mylist" element={
                            <PublicLayout>
                                <MyListPage />
                            </PublicLayout>
                        } />
                        <Route path="/discover" element={<Navigate to="/discover/category/movies" replace />} />
                        <Route path="/discover/:type/:slug" element={
                            <PublicLayout>
                                <DiscoverListPage />
                            </PublicLayout>
                        } />

                        {/* Footer Pages */}
                        <Route path="/how-it-works" element={<PublicLayout><HowItWorksPage /></PublicLayout>} />
                        <Route path="/reminders" element={<PublicLayout><RemindersPage /></PublicLayout>} />
                        <Route path="/terms" element={<PublicLayout><TermsPage /></PublicLayout>} />

                        <Route path="/timezone-sync" element={<PublicLayout><TimezoneSyncPage /></PublicLayout>} />
                        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
                        <Route path="/privacy" element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />
                        <Route path="/dmca" element={<PublicLayout><DMCAPolicyPage /></PublicLayout>} />
                        <Route path="/api" element={<PublicLayout><APIAccessPage /></PublicLayout>} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="movies/new" element={<MovieEditor />} />
                            <Route path="movies/:id/edit" element={<MovieEditor />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </MyListProvider >
        </SearchProvider >
    );
}

export default App;
