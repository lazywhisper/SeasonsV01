import svgPaths from "./svg-fq5jp1htg0";

function Frame2() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute inset-[0_44.74%_0_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8223 23.9989">
          <path d={svgPaths.p31091f00} fill="url(#paint0_radial_2041_726)" id="Vector" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="matrix(-1.09924 -24.561 17.9442 -10.8395 8.51122 24.561)" gradientUnits="userSpaceOnUse" id="paint0_radial_2041_726" r="1">
              <stop offset="0.0188373" stopColor="#F73E86" />
              <stop offset="0.362821" stopColor="#FFA795" />
              <stop offset="0.596702" stopColor="#F5DB5C" />
              <stop offset="0.85692" stopColor="#23EAD3" />
              <stop offset="0.998405" stopColor="#50E1FF" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[0_0_17.65%_57.9%]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2931 19.7638">
          <path d={svgPaths.p2f929000} fill="url(#paint0_radial_2041_707)" id="Vector_2" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="matrix(-0.941425 -20.1944 13.6037 -8.9595 6.58867 20.1944)" gradientUnits="userSpaceOnUse" id="paint0_radial_2041_707" r="1">
              <stop offset="0.00474412" stopColor="#F73E86" />
              <stop offset="0.17538" stopColor="#FD289E" />
              <stop offset="0.639698" stopColor="#8563F6" />
              <stop offset="0.85692" stopColor="#349AFF" />
              <stop offset="0.998405" stopColor="#64C3FF" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[23.999px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[23.999px] items-start left-0 top-0 w-[26.821px]" data-name="Frame1">
      <Icon />
    </div>
  );
}

function Seasons() {
  return (
    <div className="absolute contents inset-0" data-name="SEASONS">
      <div className="absolute inset-[0_0_0_88.19%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2858 10.8219">
          <path d={svgPaths.p1424be00} fill="var(--fill-0, #ACA9A9)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_14.08%_0_72.67%]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.6544 10.8219">
          <path d={svgPaths.p2a08e800} fill="var(--fill-0, #ACA9A9)" id="Vector_2" />
        </svg>
      </div>
      <div className="absolute inset-[0_29.59%_0_56.81%]" data-name="Vector_3">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9965 10.8219">
          <path d={svgPaths.p191b3f00} fill="var(--fill-0, #ACA9A9)" id="Vector_3" />
        </svg>
      </div>
      <div className="absolute inset-[0_45.11%_0_42.96%]" data-name="Vector_4">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4003 10.8219">
          <path d={svgPaths.p3d5700} fill="var(--fill-0, #ACA9A9)" id="Vector_4" />
        </svg>
      </div>
      <div className="absolute inset-[0_58.35%_0_26.74%]" data-name="Vector_5">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.2505 10.8219">
          <path d={svgPaths.p2a306a00} fill="var(--fill-0, #ACA9A9)" id="Vector_5" />
        </svg>
      </div>
      <div className="absolute inset-[0_74.46%_0_13.85%]" data-name="Vector_6">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1724 10.8219">
          <path d={svgPaths.p2cab300} fill="var(--fill-0, #ACA9A9)" id="Vector_6" />
        </svg>
      </div>
      <div className="absolute inset-[0_88.07%_0_0]" data-name="Vector_7">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4004 10.8219">
          <path d={svgPaths.p2974f80} fill="var(--fill-0, #ACA9A9)" id="Vector_7" />
        </svg>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[10.822px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Seasons />
    </div>
  );
}

function Seasons1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.822px] items-start left-[33.46px] top-[6.59px] w-[95.535px]" data-name="Seasons">
      <Icon1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full" data-name="Frame">
      <Frame1 />
      <Seasons1 />
    </div>
  );
}