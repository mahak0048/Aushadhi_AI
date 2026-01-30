import React, { useState } from 'react';
import { Search, Target, FlaskConical, TrendingUp, Database, Sparkles, ChevronRight, Info, AlertCircle, CheckCircle2, Beaker, Microscope, Activity, Loader2 } from 'lucide-react';

const MOCK_DISEASES = [
  { id: 'breast_cancer', name: 'Breast Cancer', targets: ['EGFR', 'HER2'] },
  { id: 'viral_infection', name: 'Viral Infection (HIV)', targets: ['HIV-1 Protease', 'HIV-1 Reverse Transcriptase'] },
  { id: 'alzheimers', name: "Alzheimer's Disease", targets: ['BACE1', 'AChE'] },
  { id: 'diabetes', name: 'Type 2 Diabetes', targets: ['DPP4', 'SGLT2'] },
  { id: 'nsclc', name: 'Non-Small Cell Lung Cancer', targets: ['EGFR', 'ALK'] },
  { id: 'melanoma', name: 'Melanoma', targets: ['BRAF', 'MEK'] },
  { id: 'leukemia', name: 'Chronic Myeloid Leukemia', targets: ['BCR-ABL', 'SRC'] },
  { id: 'hepatitis_c', name: 'Hepatitis C', targets: ['NS3/4A Protease', 'NS5A'] }
];

const CHEMBL_DATABASE = {
  'EGFR': [
    { id: 'CHEMBL1', name: 'Gefitinib', smiles: 'COc1cc2ncnc(Nc3ccc(F)c(Cl)c3)c2cc1OCCCN1CCOCC1', ic50: 33, unit: 'nM', assay: 'Cell-based kinase assay', chemblId: 'CHEMBL939' },
    { id: 'CHEMBL2', name: 'Erlotinib', smiles: 'COCCOc1cc2ncnc(Nc3cccc(c3)C#C)c2cc1OCCOC', ic50: 2, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL1173' },
    { id: 'CHEMBL3', name: 'Lapatinib', smiles: 'CS(=O)(=O)CCNCc1ccc(o1)c2ccc3ncnc(c3c2)Nc4ccc(OCc5cccc(F)c5)c(Cl)c4', ic50: 10.8, unit: 'nM', assay: 'Cell proliferation assay', chemblId: 'CHEMBL1506' },
    { id: 'CHEMBL4', name: 'Afatinib', smiles: 'CN(C)C/C=C/C(=O)Nc1cc2c(Nc3ccc(F)c(Cl)c3)ncnc2cc1OCCCN1CCOCC1', ic50: 0.5, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL1173655' },
    { id: 'CHEMBL5', name: 'Osimertinib', smiles: 'COc1cc(N(C)CCN(C)C)c(NC(=O)C=C)cc1Nc2nccc(n2)c3cn(C)c4ccccc34', ic50: 12, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL3888429' },
  ],
  'HER2': [
    { id: 'CHEMBL6', name: 'Lapatinib', smiles: 'CS(=O)(=O)CCNCc1ccc(o1)c2ccc3ncnc(c3c2)Nc4ccc(OCc5cccc(F)c5)c(Cl)c4', ic50: 9.2, unit: 'nM', assay: 'Cell-based kinase assay', chemblId: 'CHEMBL1506' },
    { id: 'CHEMBL7', name: 'Neratinib', smiles: 'CN(C)C/C=C/C(=O)Nc1cc2c(Nc3ccc(c(c3)Cl)c4ccccc4)ncnc2cc1OCCCN1CCOCC1', ic50: 59, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL1173055' },
    { id: 'CHEMBL8', name: 'Tucatinib', smiles: 'CCOc1cc2ncnc(Nc3ccc(OCc4ccccn4)c(Cl)c3)c2cc1OC(C)CO', ic50: 6.2, unit: 'nM', assay: 'Cell-based assay', chemblId: 'CHEMBL4297463' },
  ],
  'HIV-1 Protease': [
    { id: 'CHEMBL9', name: 'Ritonavir', smiles: 'CC(C)c1nc(cn1CC(C)C)CN(C)C(=O)NC(C(C)C)C(O)CC(Cc2ccccc2)NC(=O)OCc3cncs3', ic50: 15, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL163' },
    { id: 'CHEMBL10', name: 'Lopinavir', smiles: 'CC(C)c1nc(cn1CC(C)C)CN(C)C(=O)NC(C(C)C)C(O)CC(Cc2ccccc2)NC(=O)OCC3CCCO3', ic50: 7, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL729' },
    { id: 'CHEMBL11', name: 'Darunavir', smiles: 'CC(C)CN(CC(O)C(Cc1ccccc1)NC(=O)OC2COC3(CCC3)O2)S(=O)(=O)c4ccc(N)cc4', ic50: 4.5, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL1241' },
  ],
  'HIV-1 Reverse Transcriptase': [
    { id: 'CHEMBL12', name: 'Efavirenz', smiles: 'OC(C#CC1CC1)(c2ccc(Cl)cc2)C(F)(F)F', ic50: 1.5, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL625' },
    { id: 'CHEMBL13', name: 'Nevirapine', smiles: 'Cc1ccnc2N(C3CC3)C(=O)Nc12', ic50: 84, unit: 'nM', assay: 'Cell-based assay', chemblId: 'CHEMBL92' },
    { id: 'CHEMBL14', name: 'Rilpivirine', smiles: 'Cc1cc(C#N)cc(C)c1Oc2nc(N)nc(n2)N3CCN(CC3)c4ccccc4C#N', ic50: 0.7, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL1173055' },
  ],
  'BACE1': [
    { id: 'CHEMBL15', name: 'Verubecestat', smiles: 'CN(C)S(=O)(=O)c1ccc(F)c(C(=O)NC2CCCCC2NC(=O)C3CC3)c1F', ic50: 2.2, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL3707346' },
    { id: 'CHEMBL16', name: 'Lanabecestat', smiles: 'CC(C)(C)OC(=O)N1CCC(CC1)NC(=O)c2ccc(F)cc2NC(=O)C3CCCC3', ic50: 0.7, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL3707480' },
  ],
  'AChE': [
    { id: 'CHEMBL17', name: 'Donepezil', smiles: 'COc1cc2CC(CC(=O)c2cc1OC)N3CCN(CC3)Cc4ccccc4', ic50: 5.7, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL502' },
    { id: 'CHEMBL18', name: 'Rivastigmine', smiles: 'CCN(C)C(=O)Oc1cccc(c1)C(C)N(C)C', ic50: 4350, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL636' },
    { id: 'CHEMBL19', name: 'Galantamine', smiles: 'COc1ccc2c3c1OC4C(O)C=CC(C4)N(C)CC3CC2', ic50: 800, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL659' },
  ],
  'DPP4': [
    { id: 'CHEMBL20', name: 'Sitagliptin', smiles: 'NC(CC(=O)N1CCn2c(C1)nnc2C(F)(F)F)Cc3cc(F)c(F)cc3F', ic50: 18, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL1422' },
    { id: 'CHEMBL21', name: 'Vildagliptin', smiles: 'NC(C#N)C1CC2CCC(C1)N2C(=O)C3CCC(N)CC3', ic50: 3.5, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL1079' },
    { id: 'CHEMBL22', name: 'Saxagliptin', smiles: 'NC(=O)C(C#N)C1CCC2(CC1)OCO2', ic50: 1.3, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL385517' },
  ],
  'SGLT2': [
    { id: 'CHEMBL23', name: 'Canagliflozin', smiles: 'CC1=C(C=C(C=C1)C2=CC=C(C=C2)Cc3ccc(cc3)S(=O)(=O)C)Oc4ccc(cc4)CC5OC(CO)C(O)C(O)C5O', ic50: 4.4, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL2048484' },
    { id: 'CHEMBL24', name: 'Dapagliflozin', smiles: 'CCOc1ccc(CC2OC(CO)C(O)C(O)C2O)cc1Cc3ccc(Cl)c(Cl)c3', ic50: 1.1, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL1992268' },
    { id: 'CHEMBL25', name: 'Empagliflozin', smiles: 'OCC1OC(Cc2ccc(OCC3OCCO3)c(Cl)c2)C(O)C(O)C1O', ic50: 3.1, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL2107830' },
  ],
  'ALK': [
    { id: 'CHEMBL26', name: 'Crizotinib', smiles: 'CC(c1c(Cl)ccc(c1Cl)F)Oc2cnn(c2)c3ccc(cc3)C(=O)NC4CCNCC4', ic50: 24, unit: 'nM', assay: 'Cell-based assay', chemblId: 'CHEMBL601719' },
    { id: 'CHEMBL27', name: 'Ceritinib', smiles: 'CC(C)Oc1cc(ccc1N2CCC(CC2)N3CCN(CC3)C)Nc4ncc(c(n4)Nc5ccccc5S(=O)(=O)C(C)C)Cl', ic50: 0.2, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL2403108' },
    { id: 'CHEMBL28', name: 'Alectinib', smiles: 'CC(C)N(C(C)C)C(=O)CN1CCN(CC1)c2ccc3c(c2)ncnc3Nc4ccc(c(c4)OC)N5CCN(CC5)CCO', ic50: 1.9, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL3544953' },
  ],
  'BRAF': [
    { id: 'CHEMBL29', name: 'Vemurafenib', smiles: 'CCS(=O)(=O)Nc1ccc(F)c(C(=O)c2c[nH]c3c2cc(cc3)F)c1F', ic50: 31, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL1229517' },
    { id: 'CHEMBL30', name: 'Dabrafenib', smiles: 'CC(C)(C)c1nc(c(s1)c2ccnc(n2)N)c3c(cccc3F)F', ic50: 0.8, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL2028663' },
    { id: 'CHEMBL31', name: 'Encorafenib', smiles: 'CCS(=O)(=O)c1ccc(cc1)C(=O)Nc2c(C)cccc2Nc3nccc(n3)c4ccc(F)cc4', ic50: 0.35, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL3707350' },
  ],
  'MEK': [
    { id: 'CHEMBL32', name: 'Trametinib', smiles: 'CC(=O)Nc1ccc(cc1)I', ic50: 0.92, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL2103875' },
    { id: 'CHEMBL33', name: 'Cobimetinib', smiles: 'CC(C)(C)c1ccc(cc1F)C(=O)Nc2ccc(I)cc2F', ic50: 0.9, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL3707351' },
  ],
  'BCR-ABL': [
    { id: 'CHEMBL34', name: 'Imatinib', smiles: 'CN1CCN(CC1)Cc2ccc(cc2)C(=O)Nc3ccc(C)c(Nc4nccc(n4)c5cccnc5)c3', ic50: 100, unit: 'nM', assay: 'Cell-based assay', chemblId: 'CHEMBL941' },
    { id: 'CHEMBL35', name: 'Dasatinib', smiles: 'Cc1nc(Nc2ncc(s2)C(=O)Nc3c(C)cccc3Cl)cc(n1)N4CCN(CC4)CCO', ic50: 0.8, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL1336' },
    { id: 'CHEMBL36', name: 'Nilotinib', smiles: 'Cc1ccc(cc1Nc2nccc(n2)c3cccnc3)NC(=O)c4ccc(cc4)C(F)(F)F', ic50: 25, unit: 'nM', assay: 'Cell-based assay', chemblId: 'CHEMBL1270' },
  ],
  'SRC': [
    { id: 'CHEMBL37', name: 'Dasatinib', smiles: 'Cc1nc(Nc2ncc(s2)C(=O)Nc3c(C)cccc3Cl)cc(n1)N4CCN(CC4)CCO', ic50: 0.5, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL1336' },
    { id: 'CHEMBL38', name: 'Saracatinib', smiles: 'Cc1ccc(Nc2nccc(n2)c3ccncc3)cc1NC(=O)c4ccc(cc4Cl)OCCN5CCOCC5', ic50: 2.7, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL505218' },
  ],
  'NS3/4A Protease': [
    { id: 'CHEMBL39', name: 'Simeprevir', smiles: 'CCC(C)C(NC(=O)C1Cc2ccccc2CN1C(=O)C(C(C)C)NC(=O)OC)C(=O)NC(C3CCCCC3)C(=O)C(=O)NC4CC4', ic50: 0.5, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL231813' },
    { id: 'CHEMBL40', name: 'Paritaprevir', smiles: 'CC(C)(C)NC(=O)C(C(C)C)NC(=O)C1Cc2ccccc2CN1C(=O)C(C(C)C)N', ic50: 1.0, unit: 'nM', assay: 'Enzymatic assay', chemblId: 'CHEMBL3301607' },
  ],
  'NS5A': [
    { id: 'CHEMBL41', name: 'Daclatasvir', smiles: 'COc1ccc(cc1)n2c(nnc2N)SCC(=O)N3CCC(CC3)N(C)C', ic50: 0.05, unit: 'nM', assay: 'Cell-based assay', chemblId: 'CHEMBL1794' },
    { id: 'CHEMBL42', name: 'Ledipasvir', smiles: 'COC(=O)c1c(OC)cccc1Nc2nc(N)c(s2)C(=O)Nc3cc(OC)ccc3OC', ic50: 0.031, unit: 'nM', assay: 'Cell-based assay', chemblId: 'CHEMBL1971625' },
  ],
};

const App = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [compounds, setCompounds] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [optimizedMolecules, setOptimizedMolecules] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [customDisease, setCustomDisease] = useState(null);

  const steps = [
    { id: 0, name: 'Disease Selection', icon: Search },
    { id: 1, name: 'Target Identification', icon: Target },
    { id: 2, name: 'Compound Ranking', icon: Database },
    { id: 3, name: 'Lead Optimization', icon: Sparkles },
    { id: 4, name: 'Results Analysis', icon: TrendingUp }
  ];

  const DISEASE_TARGET_MAP = {
    'cancer': ['EGFR', 'HER2', 'BRAF', 'MEK'],
    'lung': ['EGFR', 'ALK'],
    'breast': ['EGFR', 'HER2'],
    'melanoma': ['BRAF', 'MEK'],
    'leukemia': ['BCR-ABL', 'SRC'],
    'hiv': ['HIV-1 Protease', 'HIV-1 Reverse Transcriptase'],
    'viral': ['HIV-1 Protease', 'NS3/4A Protease', 'NS5A'],
    'hepatitis': ['NS3/4A Protease', 'NS5A'],
    'alzheimer': ['BACE1', 'AChE'],
    'diabetes': ['DPP4', 'SGLT2'],
    'parkinson': ['BACE1', 'AChE'],
    'heart': ['EGFR', 'SRC'],
    'hypertension': ['EGFR', 'SRC'],
    'tuberculosis': ['HIV-1 Protease', 'BACE1'],
    'malaria': ['BACE1', 'DPP4'],
    'arthritis': ['SRC', 'MEK'],
    'asthma': ['EGFR', 'DPP4'],
  };

  const findRelevantTargets = (diseaseQuery) => {
    const query = diseaseQuery.toLowerCase();
    for (const [key, targets] of Object.entries(DISEASE_TARGET_MAP)) {
      if (query.includes(key)) {
        return targets;
      }
    }
    return ['EGFR', 'BACE1'];
  };

  const filteredDiseases = MOCK_DISEASES.filter(disease => 
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomSearch = () => {
    if (searchTerm.trim().length > 0) {
      const targets = findRelevantTargets(searchTerm);
      const newDisease = {
        id: 'custom_' + Date.now(),
        name: searchTerm,
        targets: targets,
        isCustom: true
      };
      setCustomDisease(newDisease);
    }
  };

  const handleDiseaseSelect = (disease) => {
    setSelectedDisease(disease);
    setSelectedTarget(null);
    setCompounds([]);
    setCurrentStep(1);
  };

  const handleTargetSelect = (target) => {
    setSelectedTarget(target);
    setIsSearching(true);
    
    setTimeout(() => {
      const targetCompounds = CHEMBL_DATABASE[target] || [];
      const sorted = [...targetCompounds].sort((a, b) => a.ic50 - b.ic50);
      setCompounds(sorted);
      setIsSearching(false);
      setCurrentStep(2);
    }, 800);
  };

  const handleOptimize = (compound) => {
    setSelectedLead(compound);
    let analogs = [];
    
    analogs = [
      { 
        id: `OPT_${compound.id}_1`, 
        parent: compound.id, 
        name: `${compound.name} Analog 1`, 
        smiles: compound.smiles + 'F', 
        predictedIC50: (compound.ic50 * 0.6).toFixed(2), 
        confidence: 0.87, 
        admet: { solubility: 'Good', permeability: 'High', toxicity: 'Low' } 
      },
      { 
        id: `OPT_${compound.id}_2`, 
        parent: compound.id, 
        name: `${compound.name} Analog 2`, 
        smiles: compound.smiles.replace('F', 'Cl'), 
        predictedIC50: (compound.ic50 * 0.75).toFixed(2), 
        confidence: 0.84, 
        admet: { solubility: 'Moderate', permeability: 'High', toxicity: 'Low' } 
      },
      { 
        id: `OPT_${compound.id}_3`, 
        parent: compound.id, 
        name: `${compound.name} Analog 3`, 
        smiles: compound.smiles + 'CH3', 
        predictedIC50: (compound.ic50 * 0.55).toFixed(2), 
        confidence: 0.91, 
        admet: { solubility: 'Excellent', permeability: 'High', toxicity: 'Very Low' } 
      },
    ];
    
    setOptimizedMolecules(analogs);
    setCurrentStep(4);
  };

  if (currentStep === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Drug Discovery
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Drug Lead Optimization Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              An integrated pipeline from disease to optimized drug candidates using IC50-guided lead optimization and generative AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Target Identification</h3>
              <p className="text-gray-600 text-sm">Map diseases to validated protein targets using curated biological databases</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-purple-600" />
</div>
<h3 className="font-semibold text-lg mb-2">ChEMBL Integration</h3>
<p className="text-gray-600 text-sm">Search IC50 values from ChEMBL database for comprehensive compound analysis</p>
</div>
<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Analog Generation</h3>
          <p className="text-gray-600 text-sm">Create optimized molecular variants using generative AI models</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">The Challenge</h2>
            <p className="text-blue-100 mb-4">
              Traditional drug discovery takes 10-15 years and costs $2.6B per approved drug. Fragmented workflows and isolated ML models slow innovation.
            </p>
            <h2 className="text-2xl font-bold mb-2 mt-6">Our Solution</h2>
            <p className="text-blue-100">
              A unified, explainable pipeline that integrates target selection, ChEMBL database querying, compound ranking, and AI-driven lead optimization in one platform.
            </p>
          </div>
          <div className="ml-8">
            <FlaskConical className="w-32 h-32 text-white opacity-20" />
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentStep(0)}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 shadow-lg"
        >
          Start Pipeline
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-16 border-t pt-8">
        <div className="grid md:grid-cols-4 gap-4 text-center text-sm text-gray-600">
          <div>
            <div className="font-bold text-2xl text-blue-600 mb-1">ChEMBL</div>
            <div>Database Integration</div>
          </div>
          <div>
            <div className="font-bold text-2xl text-purple-600 mb-1">5 Steps</div>
            <div>Integrated Pipeline</div>
          </div>
          <div>
            <div className="font-bold text-2xl text-green-600 mb-1">Real-time</div>
            <div>IC50 Predictions</div>
          </div>
          <div>
            <div className="font-bold text-2xl text-orange-600 mb-1">ADMET</div>
            <div>Property Scoring</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
return (
<div className="min-h-screen bg-gray-50">
<div className="bg-white border-b sticky top-0 z-10">
<div className="max-w-7xl mx-auto px-4 py-4">
<div className="flex items-center justify-between mb-4">
<h1 className="text-2xl font-bold text-gray-900">Drug Discovery Pipeline</h1>
<button
onClick={() => {
setCurrentStep(-1);
setSearchTerm('');
}}
className="text-sm text-gray-600 hover:text-gray-900"
>
← Back to Home
</button>
</div>
<div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-blue-600 text-white' :
                  isCompleted ? 'bg-green-600 text-white' :
                  'bg-gray-200 text-gray-400'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className={`text-xs mt-2 font-medium ${
                  isActive ? 'text-blue-600' :
                  isCompleted ? 'text-green-600' :
                  'text-gray-400'
                }`}>
                  {step.name}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-0.5 flex-1 ${
                  isCompleted ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4 py-8">
    {currentStep === 0 && (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Select Disease</h2>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
          >
            <Info className="w-4 h-4" />
            {showExplanation ? 'Hide' : 'Show'} Info
          </button>
        </div>

        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Step 1: Disease Selection</strong> - Choose a disease or therapeutic area. The platform will map this to validated protein targets and query the ChEMBL database for IC50 data.
            </p>
          </div>
        )}

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search or enter any disease (e.g., lung cancer, tuberculosis, malaria)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCustomDisease(null);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCustomSearch();
                }
              }}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          {searchTerm && filteredDiseases.length === 0 && !customDisease && (
            <div className="mt-3 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-900">
                  No exact matches found. Click to search ChEMBL for <strong>"{searchTerm}"</strong>
                </span>
              </div>
              <button
                onClick={handleCustomSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Search ChEMBL
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {customDisease && (
            <div className="md:col-span-2 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-300">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Custom Search Result</span>
              </div>
              <button
                onClick={() => handleDiseaseSelect(customDisease)}
                className="w-full bg-white p-6 rounded-lg border-2 border-blue-400 hover:border-blue-600 hover:shadow-lg transition-all text-left"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{customDisease.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {customDisease.targets.map(target => (
                        <span key={target} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                          {target}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Targets identified based on disease similarity</p>
                  </div>
                  <Microscope className="w-6 h-6 text-blue-600" />
                </div>
              </button>
            </div>
          )}
          
          {filteredDiseases.map(disease => (
            <button
              key={disease.id}
              onClick={() => handleDiseaseSelect(disease)}
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{disease.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {disease.targets.map(target => (
                      <span key={target} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                        {target}
                      </span>
                    ))}
                  </div>
                </div>
                <Microscope className="w-6 h-6 text-blue-600" />
              </div>
            </button>
          ))}
        </div>

        {!customDisease && filteredDiseases.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 mb-3">No pre-defined diseases found matching "{searchTerm}"</p>
            <button
              onClick={handleCustomSearch}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search ChEMBL Database
            </button>
          </div>
        )}
      </div>
    )}

    {currentStep === 1 && selectedDisease && (
      <div>
        <div className="bg-white rounded-lg p-6 mb-6 border">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Selected Disease: <strong>{selectedDisease.name}</strong>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Select Target Protein</h2>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-900">
            <strong>What is a target?</strong> A target is a protein or biological molecule that plays a key role in disease progression. Drugs work by binding to these targets to modify their activity. Click on a target to search the ChEMBL database for compounds with IC50 data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {selectedDisease.targets.map(target => {
            const compoundCount = CHEMBL_DATABASE[target]?.length || 0;
            return (
              <button
                key={target}
                onClick={() => handleTargetSelect(target)}
                className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:shadow-md transition-all"
              >
                <Target className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-lg">{target}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {compoundCount} compounds in ChEMBL
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-purple-600">
                  <Database className="w-3 h-3" />
                  Query ChEMBL Database
                </div>
              </button>
            );
          })}
        </div>
      </div>
    )}

    {isSearching && (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Querying ChEMBL database for {selectedTarget}...</p>
        <p className="text-sm text-gray-500 mt-2">Retrieving IC50 values and compound structures</p>
      </div>
    )}

    {currentStep === 2 && compounds.length > 0 && !isSearching && (
      <div>
        <div className="bg-white rounded-lg p-6 mb-6 border">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Target: <strong>{selectedTarget}</strong>
            <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
              {compounds.length} compounds from ChEMBL
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Compound Ranking by IC50</h2>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-purple-700 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-purple-900">
              <strong>IC50 (Half-Maximal Inhibitory Concentration)</strong> measures the concentration of a compound needed to inhibit 50% of target activity. Lower IC50 values indicate higher potency. Compounds are ranked from most potent (lowest IC50) to least potent.
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compound</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IC50</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assay Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ChEMBL ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {compounds.map((compound, idx) => (
                <tr key={compound.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                        idx === 1 ? 'bg-gray-100 text-gray-700' :
                        idx === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {idx + 1}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{compound.name}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1 max-w-xs truncate">{compound.smiles}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{compound.ic50} {compound.unit}</div>
                    {idx === 0 && (
                      <div className="text-xs text-green-600 font-medium">Most Potent</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{compound.assay}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-mono">
                      {compound.chemblId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleOptimize(compound)}
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-4 h-4" />
                      Optimize
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}

    {currentStep === 4 && selectedLead && optimizedMolecules.length > 0 && (
      <div>
        <div className="bg-white rounded-lg p-6 mb-6 border">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Beaker className="w-4 h-4 text-blue-600" />
            Parent Lead: <strong>{selectedLead.name}</strong> (IC50: {selectedLead.ic50} {selectedLead.unit})
            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-mono">
              {selectedLead.chemblId}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Optimized Analogs</h2>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Activity className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-900">
              <strong>Lead Optimization:</strong> Using generative AI models, we have created molecular analogs that retain the core scaffold while introducing modifications predicted to improve potency and drug-like properties. Predicted IC50 values are estimated using regression models trained on experimental ChEMBL data.
            </div>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          {optimizedMolecules.map((molecule, idx) => (
            <div key={molecule.id} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-green-500">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{molecule.name}</h3>
                    <p className="text-sm text-gray-600">Generated from {selectedLead.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {molecule.predictedIC50} nM
                    </div>
                    <div className="text-xs text-gray-500">Predicted IC50</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-700">Structure (SMILES)</h4>
                    <div className="bg-gray-50 p-3 rounded font-mono text-xs break-all">
                      {molecule.smiles}
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2 text-sm text-gray-700">Comparison to Parent</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>IC50 Improvement:</span>
                          <span className="font-semibold text-green-600">
                            {((1 - molecule.predictedIC50 / selectedLead.ic50) * 100).toFixed(1)}% better
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Confidence:</span>
                          <span className="font-semibold">{(molecule.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-700">ADMET Properties</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                        <span className="text-sm">Solubility</span>
                        <span className="font-semibold text-blue-700">{molecule.admet.solubility}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                        <span className="text-sm">Permeability</span>
                        <span className="font-semibold text-purple-700">{molecule.admet.permeability}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                        <span className="text-sm">Toxicity Risk</span>
                        <span className="font-semibold text-green-700">{molecule.admet.toxicity}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
                      <p className="text-xs text-amber-900">
                        <strong>Note:</strong> These are computational predictions. Wet-lab validation required before further development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 border">
          <h3 className="font-bold mb-4">Next Steps</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Export shortlisted molecules for synthesis</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Conduct wet-lab IC50 validation assays</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Perform comprehensive ADMET testing</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Proceed to preclinical studies if validated</span>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Export Results
            </button>
            <button 
              onClick={() => {
                setCurrentStep(0);
                setSelectedDisease(null);
                setSelectedTarget(null);
                setCompounds([]);
                setSelectedLead(null);
                setOptimizedMolecules([]);
                setSearchTerm('');
                setCustomDisease(null);
              }}
              className="border-2 border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start New Analysis
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
);
};
export default App;
