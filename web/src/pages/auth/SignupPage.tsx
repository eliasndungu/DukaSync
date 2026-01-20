import { type FormEvent, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, serverTimestamp as dbServerTimestamp, set as setRtdb } from 'firebase/database'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, database, firestore } from '@/services/firebase'
import { getDashboardPathForRole } from '@/utils/dashboardRoutes'
import type { UserRole } from '@/types/domain'
import { BadgePlus, Building2, Loader2, Store } from 'lucide-react'
import DukaSyncTermsModal from '@/components/modals/DukaSyncTermsModal'

type SignupRole = Exclude<UserRole, 'admin'>

const accountOptions: { value: SignupRole; label: string; helper: string }[] = [
  { value: 'wholesaler', label: 'Wholesaler', helper: 'Distribute inventory to shops' },
  { value: 'shopkeeper', label: 'Shopkeeper', helper: 'Run a retail shop with supplier links' },
  { value: 'customer', label: 'Customer', helper: 'Track purchases and orders' },
]

const termsRequiredAccountTypes: SignupRole[] = ['wholesaler']

const defaultChartOfAccounts = {
  wholesaler_cash: { balance: 0, currency: 'KES', label: 'Wholesaler Cash' },
  shop_receivable: { balance: 0, currency: 'KES', label: 'Shop Receivable' },
  customer_receivable: { balance: 0, currency: 'KES', label: 'Customer Receivable' },
  inventory: { balance: 0, currency: 'KES', label: 'Inventory' },
  supplier_payable: { balance: 0, currency: 'KES', label: 'Supplier Payable' },
} as const

const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY)

// Minimal Kenyan locations stub –
// Full Kenyan counties & constituencies (IEBC)
// Ready-to-paste static data

const kenyaLocations = {
  Mombasa: [
    'Changamwe',
    'Jomvu',
    'Kisauni',
    'Nyali',
    'Likoni',
    'Mvita',
  ],

  Kwale: [
    'Msambweni',
    'Lunga Lunga',
    'Matuga',
    'Kinango',
  ],

  Kilifi: [
    'Kilifi North',
    'Kilifi South',
    'Kaloleni',
    'Rabai',
    'Ganze',
    'Malindi',
    'Magarini',
  ],

  TanaRiver: [
    'Garsen',
    'Galole',
    'Bura',
  ],

  Lamu: [
    'Lamu East',
    'Lamu West',
  ],

  TaitaTaveta: [
    'Taveta',
    'Wundanyi',
    'Mwatate',
    'Voi',
  ],

  Garissa: [
    'Garissa Township',
    'Balambala',
    'Lagdera',
    'Dadaab',
    'Fafi',
    'Ijara',
  ],

  Wajir: [
    'Wajir North',
    'Wajir East',
    'Tarbaj',
    'Wajir West',
    'Eldas',
    'Wajir South',
  ],

  Mandera: [
    'Mandera West',
    'Banissa',
    'Mandera North',
    'Mandera South',
    'Mandera East',
    'Lafey',
  ],

  Marsabit: [
    'Moyale',
    'North Horr',
    'Saku',
    'Laisamis',
  ],

  Isiolo: [
    'Isiolo North',
    'Isiolo South',
  ],

  Meru: [
    'Igembe South',
    'Igembe Central',
    'Igembe North',
    'Tigania West',
    'Tigania East',
    'North Imenti',
    'Buuri',
    'Central Imenti',
    'South Imenti',
  ],

  TharakaNithi: [
    'Maara',
    'Chuka/Igambang’ombe',
    'Tharaka',
  ],

  Embu: [
    'Manyatta',
    'Runyenjes',
    'Mbeere South',
    'Mbeere North',
  ],

  Kitui: [
    'Mwingi North',
    'Mwingi West',
    'Mwingi Central',
    'Kitui West',
    'Kitui Rural',
    'Kitui Central',
    'Kitui East',
    'Kitui South',
  ],

  Machakos: [
    'Masinga',
    'Yatta',
    'Kangundo',
    'Matungulu',
    'Kathiani',
    'Mavoko',
    'Machakos Town',
    'Mwala',
  ],

  Makueni: [
    'Mbooni',
    'Kilome',
    'Kaiti',
    'Makueni',
    'Kibwezi West',
    'Kibwezi East',
  ],

  Nyandarua: [
    'Kinangop',
    'Kipipiri',
    'Ol Kalou',
    'Ol Jorok',
    'Ndaragwa',
  ],

  Nyeri: [
    'Tetu',
    'Kieni',
    'Mathira',
    'Othaya',
    'Mukurweini',
    'Nyeri Town',
  ],

  Kirinyaga: [
    'Mwea',
    'Gichugu',
    'Ndia',
    'Kirinyaga Central',
  ],

  Muranga: [
    'Kangema',
    'Mathioya',
    'Kiharu',
    'Kigumo',
    'Maragwa',
    'Kandara',
  ],

  Kiambu: [
    'Gatundu South',
    'Gatundu North',
    'Juja',
    'Thika Town',
    'Ruiru',
    'Githunguri',
    'Kiambaa',
    'Kabete',
    'Kikuyu',
    'Limuru',
    'Lari',
  ],

  Turkana: [
    'Turkana North',
    'Turkana West',
    'Turkana Central',
    'Loima',
    'Turkana South',
    'Turkana East',
  ],

  WestPokot: [
    'Kapenguria',
    'Sigor',
    'Kacheliba',
    'Pokot South',
  ],

  Samburu: [
    'Samburu West',
    'Samburu North',
    'Samburu East',
  ],

  TransNzoia: [
    'Kwanza',
    'Endebess',
    'Saboti',
    'Kiminini',
    'Cherangany',
  ],

  UasinGishu: [
    'Soy',
    'Turbo',
    'Moiben',
    'Ainabkoi',
    'Kapseret',
    'Kesses',
  ],

  ElgeyoMarakwet: [
    'Marakwet East',
    'Marakwet West',
    'Keiyo North',
    'Keiyo South',
  ],

  Nandi: [
    'Tinderet',
    'Aldai',
    'Nandi Hills',
    'Chesumei',
    'Emgwen',
    'Mosop',
  ],

  Baringo: [
    'Tiaty',
    'Baringo North',
    'Baringo Central',
    'Baringo South',
    'Mogotio',
    'Eldama Ravine',
  ],

  Laikipia: [
    'Laikipia West',
    'Laikipia East',
    'Laikipia North',
  ],

  Nakuru: [
    'Nakuru Town West',
    'Nakuru Town East',
    'Gilgil',
    'Naivasha',
    'Kuresoi South',
    'Kuresoi North',
    'Subukia',
    'Rongai',
    'Molo',
    'Njoro',
  ],

  Narok: [
    'Kilgoris',
    'Emurua Dikirr',
    'Narok North',
    'Narok East',
    'Narok South',
    'Narok West',
  ],

  Kajiado: [
    'Kajiado North',
    'Kajiado Central',
    'Kajiado East',
    'Kajiado West',
    'Kajiado South',
  ],

  Kericho: [
    'Ainamoi',
    'Belgut',
    'Sigowet/Soin',
    'Kipkelion East',
    'Kipkelion West',
  ],

  Bomet: [
    'Sotik',
    'Chepalungu',
    'Bomet East',
    'Bomet Central',
    'Konoin',
  ],

  Kakamega: [
    'Lugari',
    'Likuyani',
    'Malava',
    'Lurambi',
    'Navakholo',
    'Mumias West',
    'Mumias East',
    'Matungu',
    'Butere',
    'Khwisero',
    'Shinyalu',
    'Ikolomani',
  ],

  Vihiga: [
    'Vihiga',
    'Sabatia',
    'Hamisi',
    'Luanda',
    'Emuhaya',
  ],

  Bungoma: [
    'Mount Elgon',
    'Sirisia',
    'Kabuchai',
    'Bumula',
    'Kanduyi',
    'Webuye East',
    'Webuye West',
    'Kimilili',
    'Tongaren',
  ],

  Busia: [
    'Teso North',
    'Teso South',
    'Nambale',
    'Matayos',
    'Butula',
    'Funyula',
    'Budalangi',
  ],

  Siaya: [
    'Ugenya',
    'Ugunja',
    'Alego Usonga',
    'Gem',
    'Bondo',
    'Rarieda',
  ],

  Kisumu: [
    'Kisumu East',
    'Kisumu West',
    'Kisumu Central',
    'Seme',
    'Nyando',
    'Muhoroni',
    'Nyakach',
  ],

  HomaBay: [
    'Kasipul',
    'Kabondo Kasipul',
    'Karachuonyo',
    'Rangwe',
    'Homa Bay Town',
    'Ndhiwa',
    'Mbita',
    'Suba',
  ],

  Migori: [
    'Rongo',
    'Awendo',
    'Suna East',
    'Suna West',
    'Uriri',
    'Nyatike',
    'Kuria West',
    'Kuria East',
  ],

  Kisii: [
    'Bonchari',
    'South Mugirango',
    'Bomachoge Borabu',
    'Bomachoge Chache',
    'Bobasi',
    'Kitutu Chache North',
    'Kitutu Chache South',
    'Nyaribari Masaba',
    'Nyaribari Chache',
  ],

  Nyamira: [
    'Borabu',
    'Manga',
    'Nyamira North',
    'Nyamira South',
  ],

  Nairobi: [
    'Westlands',
    'Dagoretti North',
    'Dagoretti South',
    'Langata',
    'Kibra',
    'Roysambu',
    'Kasarani',
    'Ruaraka',
    'Embakasi South',
    'Embakasi North',
    'Embakasi Central',
    'Embakasi East',
    'Embakasi West',
    'Makadara',
    'Kamukunji',
    'Starehe',
    'Mathare',
  ],
} as const

type CountyName = keyof typeof kenyaLocations

const normalizeBusinessKey = (name: string): string =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Trial period duration in days for business accounts
const TRIAL_PERIOD_DAYS = 30
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

interface SubscriptionPayload {
  ownerType: 'wholesaler' | 'shop'
  ownerId: string
  planId: string
}

const createBusinessSubscription = async ({ ownerType, ownerId, planId }: SubscriptionPayload) => {
  const subscriptionRef = doc(firestore, 'subscriptions', ownerId)
  
  // Calculate trial end date (30 days from now)
  const now = new Date()
  const trialEndDate = new Date(now.getTime() + TRIAL_PERIOD_DAYS * MILLISECONDS_PER_DAY)
  
  await setDoc(subscriptionRef, {
    ownerType,
    ownerId,
    planId,
    status: 'trial',
    trialEndsAt: trialEndDate,
    currentPeriodEnd: trialEndDate,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

const SignupPage = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [accountType, setAccountType] = useState<SignupRole>('shopkeeper')

  // Wholesaler fields
  const [businessName, setBusinessName] = useState('')
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('')

  // Shopkeeper fields
  const [shopName, setShopName] = useState('')

  // Shared location fields for business accounts
  const [county, setCounty] = useState<CountyName | ''>('')
  const [constituency, setConstituency] = useState('')

  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  const requiresTermsAcceptance = termsRequiredAccountTypes.includes(accountType)

  const statusMessage = useMemo(() => {
    if (error) return error
    return status
  }, [error, status])

  const resetLocationIfNotBusiness = () => {
    if (accountType === 'customer') {
      setCounty('')
      setConstituency('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!isFirebaseConfigured) {
      setError('The service is not fully configured. Please try again later or contact support.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (accountType === 'wholesaler') {
      if (!businessName.trim()) {
        setError('Please enter a business name for your wholesaler account.')
        return
      }
    }

    if (accountType === 'shopkeeper') {
      if (!shopName.trim()) {
        setError('A shop name is required for shopkeeper accounts.')
        return
      }
    }

    // Location is required for wholesalers and shopkeepers
    if (accountType === 'wholesaler' || accountType === 'shopkeeper') {
      if (!county) {
        setError('Please select your county.')
        return
      }
      if (!constituency) {
        setError('Please select your constituency.')
        return
      }
    }

    if (requiresTermsAcceptance && !termsAccepted) {
      setError('You must accept the Terms and Conditions to create this type of account.')
      return
    }

    setSubmitting(true)
    setStatus('Creating your DukaPap account…')

    try {
      // For wholesalers, ensure business name uniqueness
      if (accountType === 'wholesaler') {
        const businessKey = normalizeBusinessKey(businessName)
        if (!businessKey) {
          throw new Error('Please enter a valid business name.')
        }

        const nameDocRef = doc(firestore, 'wholesalerNames', businessKey)
        const existingNameDoc = await getDoc(nameDocRef)

        if (existingNameDoc.exists()) {
          throw new Error(
            'A wholesaler with this business name is already registered. Please use a different name or contact support if you believe this is a mistake.',
          )
        }
      }

      const credential = await createUserWithEmailAndPassword(auth, email, password)
      const userId = credential.user.uid

      const normalizedRegistrationNumber =
        accountType === 'wholesaler' ? businessRegistrationNumber || null : null

      if (fullName.trim()) {
        await updateProfile(credential.user, { displayName: fullName.trim() })
      }

      const timestamps = { createdAt: serverTimestamp(), updatedAt: serverTimestamp() }

      const userDoc: Record<string, unknown> = {
        uid: userId,
        accountType,
        displayName: fullName || undefined,
        email,
        ...timestamps,
      }

      if (accountType === 'wholesaler') {
        userDoc.businessName = businessName
        userDoc.businessRegistrationNumber = normalizedRegistrationNumber
        userDoc.county = county
        userDoc.constituency = constituency
      }

      if (accountType === 'shopkeeper') {
        userDoc.shopName = shopName
        userDoc.county = county
        userDoc.constituency = constituency
      }

      await setDoc(doc(firestore, 'users', userId), userDoc)

      if (accountType === 'wholesaler') {
        const wholesalerId = userId
        const businessKey = normalizeBusinessKey(businessName)

        await setDoc(doc(firestore, 'wholesalers', wholesalerId), {
          id: wholesalerId,
          name: businessName,
          registrationNumber: normalizedRegistrationNumber,
          ownerUserId: wholesalerId,
          county,
          constituency,
          type: 'wholesaler',
          ...timestamps,
        })

        // Index on normalized business name for uniqueness checks
        if (businessKey) {
          await setDoc(doc(firestore, 'wholesalerNames', businessKey), {
            businessKey,
            displayName: businessName,
            ownerUserId: wholesalerId,
            ...timestamps,
          })
        }

        const financialAccounts = {
          chartOfAccounts: defaultChartOfAccounts,
          meta: {
            createdAt: dbServerTimestamp(),
            createdBy: wholesalerId,
          },
        }

        try {
          await setRtdb(ref(database, `wholesalers/${wholesalerId}/financials`), financialAccounts)
        } catch (rtdbError) {
          throw new Error(
            rtdbError instanceof Error
              ? `We created your wholesaler profile, but financial accounts were not set up (${rtdbError.message}). Please retry from settings or contact support.`
              : 'We created your wholesaler profile, but financial accounts were not set up. Please retry from settings or contact support.',
          )
        }

        // Create trial subscription for wholesaler
        await createBusinessSubscription({
          ownerType: 'wholesaler',
          ownerId: wholesalerId,
          planId: 'wholesaler_basic',
        })
      } else if (accountType === 'shopkeeper') {
        const shopId = userId

        await setDoc(doc(firestore, 'shops', shopId), {
          id: shopId,
          ownerUserId: shopId,
          name: shopName,
          county,
          constituency,
          type: 'shopkeeper',
          ...timestamps,
        })

        // Create trial subscription for shop
        await createBusinessSubscription({
          ownerType: 'shop',
          ownerId: shopId,
          planId: 'shop_basic',
        })
      }

      let onboardingNotice: string | null = null
      const onboardingUrl = import.meta.env.VITE_ONBOARDING_API_URL
      if (onboardingUrl) {
        try {
          const idToken = await credential.user.getIdToken()
          const onboardingPayload = {
            uid: userId,
            role: accountType,
            email,
            name: fullName,
            businessName: accountType === 'wholesaler' ? businessName : undefined,
            businessRegistrationNumber: normalizedRegistrationNumber,
            shopName: accountType === 'shopkeeper' ? shopName : undefined,
            county: accountType === 'wholesaler' || accountType === 'shopkeeper' ? county : undefined,
            constituency:
              accountType === 'wholesaler' || accountType === 'shopkeeper' ? constituency : undefined,
          }
          const response = await fetch(onboardingUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(onboardingPayload),
          })
          if (!response.ok) {
            throw new Error(`Onboarding API returned ${response.status}`)
          }
        } catch (onboardingError) {
          console.warn(
            'Backend onboarding request failed - account created but additional backend setup may be required.',
            onboardingError,
          )
          onboardingNotice =
            'Account created, but some background setup did not complete. You may need to finish configuration from settings.'
        }
      }

      const destination = getDashboardPathForRole(accountType)
      setStatus(onboardingNotice ?? 'Account created! Redirecting to your dashboard…')
      navigate(destination, { replace: true })
    } catch (submitError) {
      console.error('Signup error:', submitError)
      const message =
        submitError instanceof Error
          ? submitError.message
          : 'Unable to create your account right now. Please try again.'
      setError(message)
      setStatus(null)
    } finally {
      setSubmitting(false)
    }
  }

  const availableConstituencies: string[] =
    county && kenyaLocations[county] ? [...kenyaLocations[county]] : []

  // If user switches to customer, clear business-specific fields
  const handleAccountTypeChange = (value: SignupRole) => {
    setAccountType(value)
    if (value === 'customer') {
      setBusinessName('')
      setBusinessRegistrationNumber('')
      setShopName('')
      resetLocationIfNotBusiness()
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <BadgePlus className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Create your DukaPap account</h1>
        <p className="text-slate-600">
          Choose the account that fits how you operate - wholesaler, shopkeeper, or customer. We&apos;ll set up the right
          tools instantly.
        </p>
      </div>

      <div className="card p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="Jane Doe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="you@dukapap.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-3">
            <span className="block text-sm font-medium text-slate-700">Account type</span>
            <div className="grid gap-3 sm:grid-cols-3">
              {accountOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleAccountTypeChange(option.value)}
                  className={`flex w-full flex-col items-start rounded-xl border p-4 text-left transition hover:border-brand-200 hover:bg-brand-50 ${
                    accountType === option.value ? 'border-brand-400 bg-brand-50 shadow-sm' : 'border-slate-200 bg-white'
                  }`}
                >
                  <span className="text-sm font-semibold text-slate-900">{option.label}</span>
                  <span className="text-xs text-slate-500">{option.helper}</span>
                </button>
              ))}
            </div>
          </div>

          {accountType === 'wholesaler' && (
            <div className="space-y-3 rounded-xl border border-brand-100 bg-brand-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-800">
                <Building2 className="h-4 w-4" />
                Wholesaler details
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="businessName" className="block text-sm font-medium text-slate-700">
                    Business name
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    required={accountType === 'wholesaler'}
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    placeholder="Duka Distributors Ltd."
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="businessRegistrationNumber" className="block text-sm font-medium text-slate-700">
                    Registration number (optional)
                  </label>
                  <input
                    id="businessRegistrationNumber"
                    type="text"
                    value={businessRegistrationNumber}
                    onChange={(event) => setBusinessRegistrationNumber(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    placeholder="BRN-123456"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="wholesalerCounty" className="block text-sm font-medium text-slate-700">
                    County
                  </label>
                  <select
                    id="wholesalerCounty"
                    value={county}
                    onChange={(event) => {
                      const selectedCounty = event.target.value as CountyName | ''
                      setCounty(selectedCounty)
                      setConstituency('')
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  >
                    <option value="">Select county</option>
                    {Object.keys(kenyaLocations).map((countyName) => (
                      <option key={countyName} value={countyName}>
                        {countyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="wholesalerConstituency" className="block text-sm font-medium text-slate-700">
                    Constituency
                  </label>
                  <select
                    id="wholesalerConstituency"
                    value={constituency}
                    onChange={(event) => setConstituency(event.target.value)}
                    disabled={!county}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                  >
                    <option value="">Select constituency</option>
                    {availableConstituencies.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {accountType === 'shopkeeper' && (
            <div className="space-y-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                <Store className="h-4 w-4" />
                Shop details
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="shopName" className="block text-sm font-medium text-slate-700">
                    Shop name
                  </label>
                  <input
                    id="shopName"
                    type="text"
                    required={accountType === 'shopkeeper'}
                    value={shopName}
                    onChange={(event) => setShopName(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    placeholder="Mama Mbogas Mini Shop"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="shopCounty" className="block text-sm font-medium text-slate-700">
                    County
                  </label>
                  <select
                    id="shopCounty"
                    value={county}
                    onChange={(event) => {
                      const selectedCounty = event.target.value as CountyName | ''
                      setCounty(selectedCounty)
                      setConstituency('')
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  >
                    <option value="">Select county</option>
                    {Object.keys(kenyaLocations).map((countyName) => (
                      <option key={countyName} value={countyName}>
                        {countyName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="shopConstituency" className="block text-sm font-medium text-slate-700">
                  Constituency
                </label>
                <select
                  id="shopConstituency"
                  value={constituency}
                  onChange={(event) => setConstituency(event.target.value)}
                  disabled={!county}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                >
                  <option value="">Select constituency</option>
                  {availableConstituencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {statusMessage && (
            <div
              className={`rounded-lg px-3 py-2 text-sm ${
                error
                  ? 'border border-rose-100 bg-rose-50 text-rose-700'
                  : 'border border-emerald-100 bg-emerald-50 text-emerald-700'
              }`}
            >
              {statusMessage}
            </div>
          )}

          {requiresTermsAcceptance && (
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <input
                id="termsAccepted"
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                aria-describedby="termsAcceptedDescription"
                aria-required={requiresTermsAcceptance}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <div className="space-y-1 text-sm text-slate-700">
                <label htmlFor="termsAccepted" className="block font-medium text-slate-900">
                  I have read and accept the Terms and Conditions for DukaSync business accounts.
                </label>
                <p id="termsAcceptedDescription" className="text-slate-600">
                  Wholesalers must agree to the DukaSync terms covering deliveries, invoicing, and data use.
                </p>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="font-semibold text-brand-700 hover:underline"
                >
                  View Terms and Conditions
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account…
              </>
            ) : (
              <>
                <BadgePlus className="h-4 w-4" />
                Create account
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-700">
            Sign in
          </Link>
        </div>
      </div>

      <DukaSyncTermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => {
          setTermsAccepted(true)
          setShowTermsModal(false)
        }}
      />
    </div>
  )
}

export default SignupPage
