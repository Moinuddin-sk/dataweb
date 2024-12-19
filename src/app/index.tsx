import { AuthLayout } from "libs/shared/layout";
import { FeatureDSOCorporate } from "pages/feature-dso-corporate";
import { FeatureLogin } from "pages/login";
import { FeatureHome } from "pages/feature-home";
import { Route, Routes } from "react-router-dom";
import { FeatureDSOInfo } from "pages/feature-dso-info";
import { FeatureOrgDetails } from "pages/feature-org-details";
import { FeatureOrgDetailsNew } from "pages/feature-org-details-new"
import { FeatureSubsidiaryDetails } from "pages/feature-subsidiary-details";
import { FeaturePracticeLocationDetails } from "pages/feature-practice-location-details";
import { FeatureDentalInfosNew } from "pages/feature-dental-labs-new";
import { FeatureAllDentistInfosNew } from "pages/feature-all-dentist-new";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FeatureLogin />} />
      <Route path="/" element={<AuthLayout />}>
        <Route path="/app" element={<FeatureHome />} />
        <Route path="/search" element={<FeatureDSOCorporate />} />
        <Route path="/info" element={<FeatureDSOInfo />} />
        <Route path="/org-info" element={<FeatureOrgDetails />} />
        <Route path="/subsidiary-info" element={<FeatureSubsidiaryDetails />} />
        <Route path="/practice-info" element={<FeaturePracticeLocationDetails />} />
        <Route path="/dental-info" element={<FeatureDentalInfosNew />} />
        <Route path="/dentist-info" element={<FeatureAllDentistInfosNew />} />
      </Route>
    </Routes>
  );
};
