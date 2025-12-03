import svgPaths from "./svg-xpid9h9j94";
import imgImage from "figma:asset/7c08a957a4ee669db2ef477c3f8e8c6ec80c1dd9.png";
import imgImageBackground from "figma:asset/b14d5eb3506feec3914937c85086b7cad298bce2.png";
import imgImageBackground1 from "figma:asset/8a3f153950a97204afc396cc2207dcc4f002599b.png";
import imgImageBackground2 from "figma:asset/599dc5348c7dcef23af87869a808bcf99bf63bbf.png";
import imgImageBackground3 from "figma:asset/ffa49ea954513eab02aea26547630cc3542e7df7.png";
import imgImageBackground4 from "figma:asset/dc0ec71cd2f4f16e413cdb0aaf9ab6f90e492400.png";
import imgImageBackground5 from "figma:asset/f923aa280af1055f30c7a45cd529203c48a74ab2.png";
import imgImageBackground6 from "figma:asset/74f42b0e73627cc1b6c5ea3731435742792b43fe.png";

function Container() {
  return <div className="basis-0 grow min-h-px min-w-px self-stretch shrink-0" data-name="Container" />;
}

function FotoProfilDariMuhammadHilmanAzhar() {
  return <div className="max-w-[40px] shrink-0 size-[40px]" data-name="Foto profil dari Muhammad Hilman Azhar" />;
}

function Container1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <FotoProfilDariMuhammadHilmanAzhar />
    </div>
  );
}

function ButtonMenu() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[20px] shrink-0 size-[40px]" data-name="Button menu">
      <Container1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-center justify-end max-w-[426px] relative shrink-0 w-full" data-name="Container">
      <ButtonMenu />
    </div>
  );
}

function Container3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[44px] pt-[48px] px-[64px] relative self-stretch shrink-0 w-[426px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Poppins_Medium:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.92)] text-nowrap tracking-[-0.2px]">
        <p className="leading-[30px] whitespace-pre">Laporan kehilangan terbaru</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13.8px] text-[rgba(255,255,255,0.92)] text-nowrap tracking-[-0.2px]">
        <p className="leading-[21px] whitespace-pre">Lihat semua</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.pe71b400} fill="var(--fill-0, white)" fillOpacity="0.92" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[2px] px-0 relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center pl-[4px] pr-0 py-0 relative self-stretch shrink-0" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Container6 />
      <Margin />
    </div>
  );
}

function Link() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[12px] py-0 relative shrink-0" data-name="Link">
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[48px] right-[48px] top-[384px]" data-name="Container">
      <Container5 />
      <Link />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Poppins_Medium:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.92)] text-nowrap tracking-[-0.2px]">
        <p className="leading-[30px] whitespace-pre">Laporan temuan terbaru</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13.8px] text-[rgba(255,255,255,0.92)] text-nowrap tracking-[-0.2px]">
        <p className="leading-[21px] whitespace-pre">Lihat semua</p>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.pe71b400} fill="var(--fill-0, white)" fillOpacity="0.92" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[2px] px-0 relative shrink-0" data-name="Container">
      <Svg1 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center pl-[4px] pr-0 py-0 relative self-stretch shrink-0" data-name="Margin">
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Container11 />
      <Margin1 />
    </div>
  );
}

function Link1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[12px] py-0 relative shrink-0" data-name="Link">
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[48px] right-[48px] top-[1310px]" data-name="Container">
      <Container10 />
      <Link1 />
    </div>
  );
}

function Background() {
  return <div className="absolute bg-[#0071ca] inset-0 rounded-[25.6px]" data-name="Background" />;
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Poppins_Medium:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-white w-full">
        <p className="leading-[48px]">Menemukan atau kehilangan barang?</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[24px]">Segera laporkan sesuai dengan kebutuhan anda disini</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex h-[56px] items-center justify-center min-w-[166px] pb-[18.8px] pl-[23.41px] pr-[23.42px] pt-[17.2px] relative rounded-[16px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">Lapor Kehilangan</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0" data-name="Link">
      <Button />
    </div>
  );
}

function LinkMargin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[16px] py-0 relative self-stretch shrink-0" data-name="Link:margin">
      <Link2 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex h-[56px] items-center justify-center min-w-[166px] pb-[18.8px] pl-[25.41px] pr-[25.43px] pt-[17.2px] relative rounded-[16px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">Lapor Penemuan</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0" data-name="Link">
      <Button1 />
    </div>
  );
}

function LinkMargin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[16px] py-0 relative self-stretch shrink-0" data-name="Link:margin">
      <Link3 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <LinkMargin />
      <LinkMargin1 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[20px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container17 />
    </div>
  );
}

function Container18() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-[48px] pr-[36px] py-[36px] relative size-full">
          <Container15 />
          <Container16 />
          <Margin2 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col h-[320px] items-start justify-center left-[48px] right-[48px] rounded-[25.6px] top-0" data-name="Container">
      <div className="absolute bg-[#003967] inset-[3.13%_2.5%_-3.13%_2.5%] rounded-[24px]" data-name="Background" />
      <Background />
      <div className="absolute h-[320px] left-0 right-0 top-0" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[114.84%]" src={imgImage} />
        </div>
      </div>
      <Container18 />
    </div>
  );
}

function OverlayShadow() {
  return <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_10px_160px_10px_rgba(17,12,46,0.05)]" data-name="Overlay+Shadow" />;
}

function LinkPaints() {
  return <div className="absolute bg-[#222222] inset-0 rounded-[24px]" data-name="Link paints" />;
}

function Container20() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[10px] right-[10px] top-[10px]" data-name="Container">
      <div className="basis-0 grow h-[200px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Image+Background">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#313131] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[173.97%] left-0 max-w-none top-[-36.99%] w-full" src={imgImageBackground} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-[214.44px]" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.92)] top-[8.4px] translate-y-[-50%] w-[214.807px]">
        <p className="leading-[18px]">Pos Satuan Keamanan Kampus (SKK)</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#008fff] box-border content-stretch flex items-start px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[18px] whitespace-pre">Aktif</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[4px] py-0 relative w-full">
          <Container21 />
          <Background1 />
        </div>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container22 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[15.6px] text-[rgba(255,255,255,0.92)] w-full">
        <p className="leading-[24px]">STNK (L6517LU)</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9f] text-[14px] w-full">
        <p className="leading-[21px]">STNK L 6517 LU a/n ayu marini</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container24 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start justify-center left-[12px] pl-[4px] pr-0 py-0 right-[8px] top-[220px]" data-name="Container">
      <Margin3 />
      <Container23 />
      <Margin4 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[36px] items-center justify-center min-w-[367.95px] overflow-clip pb-[8.99px] pl-[151.98px] pr-[151.97px] pt-[8.01px] relative rounded-[12px] shadow-[0px_0px_0px_1px_#808080] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-nowrap text-white">
        <p className="leading-[18.57px] whitespace-pre">Detail</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bottom-[14px] box-border content-stretch flex items-end left-[2.72%] pl-[4px] pr-[24px] py-0 right-[-2.72%]" data-name="Container">
      <Button2 />
    </div>
  );
}

function Link4() {
  return (
    <div className="h-[400px] min-h-[400px] relative rounded-[24px] shrink-0 w-full" data-name="Link">
      <OverlayShadow />
      <LinkPaints />
      <Container20 />
      <Container25 />
      <Container26 />
    </div>
  );
}

function LinkMargin2() {
  return (
    <div className="absolute bottom-[416px] box-border content-stretch flex flex-col items-start justify-center left-0 min-h-[416px] pb-0 pt-[16px] px-[8px] right-[828.05px] top-0" data-name="Link:margin">
      <Link4 />
    </div>
  );
}

function OverlayShadow1() {
  return <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_10px_160px_10px_rgba(17,12,46,0.05)]" data-name="Overlay+Shadow" />;
}

function LinkPaints1() {
  return <div className="absolute bg-[#222222] inset-0 rounded-[24px]" data-name="Link paints" />;
}

function Container27() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[10px] right-[10px] top-[10px]" data-name="Container">
      <div className="basis-0 grow h-[200px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Image+Background">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#313131] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[309.29%] left-0 max-w-none top-[-104.64%] w-full" src={imgImageBackground1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-[98.91px]" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.92)] top-[8.4px] translate-y-[-50%] w-[99.263px]">
        <p className="leading-[18px]">Tata Usaha SKPB</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#008fff] box-border content-stretch flex items-start px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[18px] whitespace-pre">Aktif</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[4px] py-0 relative w-full">
          <Container28 />
          <Background2 />
        </div>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[15.6px] text-[rgba(255,255,255,0.92)] w-full">
        <p className="leading-[24px]">Tumbler (0000000)</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9f] text-[14px] w-full">
        <p className="leading-[21px]">botol hitam ada lingkar putih di dekat tutup</p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container31 />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start justify-center left-[12px] pl-[4px] pr-0 py-0 right-[8px] top-[220px]" data-name="Container">
      <Margin5 />
      <Container30 />
      <Margin6 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[36px] items-center justify-center min-w-[367.95px] overflow-clip pb-[8.99px] pl-[151.97px] pr-[151.98px] pt-[8.01px] relative rounded-[12px] shadow-[0px_0px_0px_1px_#808080] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-nowrap text-white">
        <p className="leading-[18.57px] whitespace-pre">Detail</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bottom-[14px] box-border content-stretch flex items-end left-[2.72%] pl-[4px] pr-[24px] py-0 right-[-2.72%]" data-name="Container">
      <Button3 />
    </div>
  );
}

function Link5() {
  return (
    <div className="h-[400px] min-h-[400px] relative rounded-[24px] shrink-0 w-full" data-name="Link">
      <OverlayShadow1 />
      <LinkPaints1 />
      <Container27 />
      <Container32 />
      <Container33 />
    </div>
  );
}

function LinkMargin3() {
  return (
    <div className="absolute bottom-[416px] box-border content-stretch flex flex-col items-start justify-center left-[383.95px] min-h-[416px] pb-0 pt-[16px] px-[8px] right-[444.1px] top-0" data-name="Link:margin">
      <Link5 />
    </div>
  );
}

function OverlayShadow2() {
  return <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_10px_160px_10px_rgba(17,12,46,0.05)]" data-name="Overlay+Shadow" />;
}

function LinkPaints2() {
  return <div className="absolute bg-[#222222] inset-0 rounded-[24px]" data-name="Link paints" />;
}

function Container34() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[10px] right-[10px] top-[10px]" data-name="Container">
      <div className="basis-0 grow h-[200px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Image+Background">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#313131] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[173.97%] left-0 max-w-none top-[-36.99%] w-full" src={imgImageBackground2} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-[98.91px]" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.92)] top-[8.4px] translate-y-[-50%] w-[99.263px]">
        <p className="leading-[18px]">Tata Usaha SKPB</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#008fff] box-border content-stretch flex items-start px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[18px] whitespace-pre">Aktif</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[4px] py-0 relative w-full">
          <Container35 />
          <Background3 />
        </div>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container36 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.92)] w-full">
        <p className="leading-[24px]">Lainnya</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9f] text-[14px] w-full">
        <p className="leading-[21px]">Jaket Uniqlo x Kaws x Warhol Hitam Ukuran L</p>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start justify-center left-[12px] pl-[4px] pr-0 py-0 right-[8px] top-[220px]" data-name="Container">
      <Margin7 />
      <Container37 />
      <Margin8 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[36px] items-center justify-center min-w-[367.95px] overflow-clip pb-[8.99px] pl-[151.98px] pr-[151.97px] pt-[8.01px] relative rounded-[12px] shadow-[0px_0px_0px_1px_#808080] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-nowrap text-white">
        <p className="leading-[18.57px] whitespace-pre">Detail</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute bottom-[14px] box-border content-stretch flex items-end left-[2.72%] pl-[4px] pr-[24px] py-0 right-[-2.72%]" data-name="Container">
      <Button4 />
    </div>
  );
}

function Link6() {
  return (
    <div className="h-[400px] min-h-[400px] relative rounded-[24px] shrink-0 w-full" data-name="Link">
      <OverlayShadow2 />
      <LinkPaints2 />
      <Container34 />
      <Container39 />
      <Container40 />
    </div>
  );
}

function LinkMargin4() {
  return (
    <div className="absolute bottom-[416px] box-border content-stretch flex flex-col items-start justify-center left-[767.9px] min-h-[416px] pb-0 pt-[16px] px-[8px] right-[60.15px] top-0" data-name="Link:margin">
      <Link6 />
    </div>
  );
}

function OverlayShadow3() {
  return <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_10px_160px_10px_rgba(17,12,46,0.05)]" data-name="Overlay+Shadow" />;
}

function LinkPaints3() {
  return <div className="absolute bg-[#222222] inset-0 rounded-[24px]" data-name="Link paints" />;
}

function Container41() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[10px] right-[10px] top-[10px]" data-name="Container">
      <div className="basis-0 grow h-[200px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Image+Background">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#313131] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[396.28%] left-0 max-w-none top-[-148.14%] w-full" src={imgImageBackground3} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-[214.44px]" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.92)] top-[8.4px] translate-y-[-50%] w-[214.807px]">
        <p className="leading-[18px]">Pos Satuan Keamanan Kampus (SKK)</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#008fff] box-border content-stretch flex items-start px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[18px] whitespace-pre">Aktif</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[4px] py-0 relative w-full">
          <Container42 />
          <Background4 />
        </div>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container43 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[15.5px] text-[rgba(255,255,255,0.92)] w-full">
        <p className="leading-[24px]">Dompet (KTP3510162501060002)</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[21px] not-italic relative shrink-0 text-[#9a9a9f] text-[14px] w-full">
        <p className="mb-0">dompet warna cokelat berisi uang Tunai 500K</p>
        <p>{`beserta ATM BNI, KTP, KTM (An. In'am Haajid…`}</p>
      </div>
    </div>
  );
}

function Margin10() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container45 />
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start justify-center left-[12px] pl-[4px] pr-0 py-0 right-[8px] top-[220px]" data-name="Container">
      <Margin9 />
      <Container44 />
      <Margin10 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[36px] items-center justify-center min-w-[367.95px] overflow-clip pb-[8.99px] pl-[151.98px] pr-[151.97px] pt-[8.01px] relative rounded-[12px] shadow-[0px_0px_0px_1px_#808080] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-nowrap text-white">
        <p className="leading-[18.57px] whitespace-pre">Detail</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bottom-[14px] box-border content-stretch flex items-end left-[2.72%] pl-[4px] pr-[24px] py-0 right-[-2.72%]" data-name="Container">
      <Button5 />
    </div>
  );
}

function Link7() {
  return (
    <div className="h-[400px] min-h-[400px] relative rounded-[24px] shrink-0 w-full" data-name="Link">
      <OverlayShadow3 />
      <LinkPaints3 />
      <Container41 />
      <Container46 />
      <Container47 />
    </div>
  );
}

function LinkMargin5() {
  return (
    <div className="absolute bottom-0 box-border content-stretch flex flex-col items-start justify-center left-0 min-h-[416px] pb-0 pt-[16px] px-[8px] right-[828.05px] top-[416px]" data-name="Link:margin">
      <Link7 />
    </div>
  );
}

function OverlayShadow4() {
  return <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_10px_160px_10px_rgba(17,12,46,0.05)]" data-name="Overlay+Shadow" />;
}

function LinkPaints4() {
  return <div className="absolute bg-[#222222] inset-0 rounded-[24px]" data-name="Link paints" />;
}

function Container48() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[10px] right-[10px] top-[10px]" data-name="Container">
      <div className="basis-0 grow h-[200px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Image+Background">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#313131] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[173.97%] left-0 max-w-none top-[-36.99%] w-full" src={imgImageBackground} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-[98.91px]" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.92)] top-[8.4px] translate-y-[-50%] w-[99.263px]">
        <p className="leading-[18px]">Tata Usaha SKPB</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#008fff] box-border content-stretch flex items-start px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[18px] whitespace-pre">Aktif</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[4px] py-0 relative w-full">
          <Container49 />
          <Background5 />
        </div>
      </div>
    </div>
  );
}

function Margin11() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container50 />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[15.6px] text-[rgba(255,255,255,0.92)] w-full">
        <p className="leading-[24px]">STNK (5045251072)</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9f] text-[14px] w-full">
        <p className="leading-[21px]">STNK motor nmax L 3644 ACS</p>
      </div>
    </div>
  );
}

function Margin12() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container52 />
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start justify-center left-[12px] pl-[4px] pr-0 py-0 right-[8px] top-[220px]" data-name="Container">
      <Margin11 />
      <Container51 />
      <Margin12 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[36px] items-center justify-center min-w-[367.95px] overflow-clip pb-[8.99px] pl-[151.97px] pr-[151.98px] pt-[8.01px] relative rounded-[12px] shadow-[0px_0px_0px_1px_#808080] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-nowrap text-white">
        <p className="leading-[18.57px] whitespace-pre">Detail</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute bottom-[14px] box-border content-stretch flex items-end left-[2.72%] pl-[4px] pr-[24px] py-0 right-[-2.72%]" data-name="Container">
      <Button6 />
    </div>
  );
}

function Link8() {
  return (
    <div className="h-[400px] min-h-[400px] relative rounded-[24px] shrink-0 w-full" data-name="Link">
      <OverlayShadow4 />
      <LinkPaints4 />
      <Container48 />
      <Container53 />
      <Container54 />
    </div>
  );
}

function LinkMargin6() {
  return (
    <div className="absolute bottom-0 box-border content-stretch flex flex-col items-start justify-center left-[383.95px] min-h-[416px] pb-0 pt-[16px] px-[8px] right-[444.1px] top-[416px]" data-name="Link:margin">
      <Link8 />
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute h-[832px] left-[32px] right-[32px] top-[414px]" data-name="Container">
      <LinkMargin2 />
      <LinkMargin3 />
      <LinkMargin4 />
      <LinkMargin5 />
      <LinkMargin6 />
    </div>
  );
}

function OverlayShadow5() {
  return <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_10px_160px_10px_rgba(17,12,46,0.05)]" data-name="Overlay+Shadow" />;
}

function LinkPaints5() {
  return <div className="absolute bg-[#222222] inset-0 rounded-[24px]" data-name="Link paints" />;
}

function Container56() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[10px] right-[10px] top-[10px]" data-name="Container">
      <div className="basis-0 grow h-[200px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Image+Background">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#313131] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[173.97%] left-0 max-w-none top-[-36.99%] w-full" src={imgImageBackground4} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-[79.09px]" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.92)] top-[8.4px] translate-y-[-50%] w-[79.412px]">
        <p className="leading-[18px]">Perpustakaan</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#008fff] box-border content-stretch flex items-start px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[18px] whitespace-pre">Aktif</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[4px] py-0 relative w-full">
          <Container57 />
          <Background6 />
        </div>
      </div>
    </div>
  );
}

function Margin13() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container58 />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.92)] w-full">
        <p className="leading-[24px]">Kunci (197605252**7*11*0*A)</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[21px] not-italic relative shrink-0 text-[#9a9a9f] text-[14px] w-full">
        <p className="mb-0">{`Kunci motor HONDA dengan gantungan angka "1"`}</p>
        <p>(ukuran besar warna biru)</p>
      </div>
    </div>
  );
}

function Margin14() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container60 />
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start justify-center left-[12px] pl-[4px] pr-0 py-0 right-[8px] top-[220px]" data-name="Container">
      <Margin13 />
      <Container59 />
      <Margin14 />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[36px] items-center justify-center min-w-[367.95px] overflow-clip pb-[8.99px] pl-[151.98px] pr-[151.97px] pt-[8.01px] relative rounded-[12px] shadow-[0px_0px_0px_1px_#808080] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-nowrap text-white">
        <p className="leading-[18.57px] whitespace-pre">Detail</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute bottom-[14px] box-border content-stretch flex items-end left-[2.72%] pl-[4px] pr-[24px] py-0 right-[-2.72%]" data-name="Container">
      <Button7 />
    </div>
  );
}

function Link9() {
  return (
    <div className="h-[400px] min-h-[400px] relative rounded-[24px] shrink-0 w-full" data-name="Link">
      <OverlayShadow5 />
      <LinkPaints5 />
      <Container56 />
      <Container61 />
      <Container62 />
    </div>
  );
}

function LinkMargin7() {
  return (
    <div className="absolute bottom-[416px] box-border content-stretch flex flex-col items-start justify-center left-0 min-h-[416px] pb-0 pt-[16px] px-[8px] right-[828.05px] top-0" data-name="Link:margin">
      <Link9 />
    </div>
  );
}

function OverlayShadow6() {
  return <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_10px_160px_10px_rgba(17,12,46,0.05)]" data-name="Overlay+Shadow" />;
}

function LinkPaints6() {
  return <div className="absolute bg-[#222222] inset-0 rounded-[24px]" data-name="Link paints" />;
}

function Container63() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[10px] right-[10px] top-[10px]" data-name="Container">
      <div className="basis-0 grow h-[200px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Image+Background">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#313131] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[173.97%] left-0 max-w-none top-[-36.99%] w-full" src={imgImageBackground4} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-[79.09px]" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.92)] top-[8.4px] translate-y-[-50%] w-[79.412px]">
        <p className="leading-[18px]">Perpustakaan</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#008fff] box-border content-stretch flex items-start px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[18px] whitespace-pre">Aktif</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[4px] py-0 relative w-full">
          <Container64 />
          <Background7 />
        </div>
      </div>
    </div>
  );
}

function Margin15() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container65 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.92)] w-full">
        <p className="leading-[24px]">Kunci (19760525*00**1**02)</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[21px] not-italic relative shrink-0 text-[#9a9a9f] text-[14px] w-full">
        <p className="mb-0">Kunci Motor Honda dengan gantungan Abjad Huruf</p>
        <p>{`"A" dan Bintang kecil warna kuning`}</p>
      </div>
    </div>
  );
}

function Margin16() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container67 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start justify-center left-[12px] pl-[4px] pr-0 py-0 right-[8px] top-[220px]" data-name="Container">
      <Margin15 />
      <Container66 />
      <Margin16 />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[36px] items-center justify-center min-w-[367.95px] overflow-clip pb-[8.99px] pl-[151.97px] pr-[151.98px] pt-[8.01px] relative rounded-[12px] shadow-[0px_0px_0px_1px_#808080] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-nowrap text-white">
        <p className="leading-[18.57px] whitespace-pre">Detail</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute bottom-[14px] box-border content-stretch flex items-end left-[2.72%] pl-[4px] pr-[24px] py-0 right-[-2.72%]" data-name="Container">
      <Button8 />
    </div>
  );
}

function Link10() {
  return (
    <div className="h-[400px] min-h-[400px] relative rounded-[24px] shrink-0 w-full" data-name="Link">
      <OverlayShadow6 />
      <LinkPaints6 />
      <Container63 />
      <Container68 />
      <Container69 />
    </div>
  );
}

function LinkMargin8() {
  return (
    <div className="absolute bottom-[416px] box-border content-stretch flex flex-col items-start justify-center left-[383.95px] min-h-[416px] pb-0 pt-[16px] px-[8px] right-[444.1px] top-0" data-name="Link:margin">
      <Link10 />
    </div>
  );
}

function OverlayShadow7() {
  return <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_10px_160px_10px_rgba(17,12,46,0.05)]" data-name="Overlay+Shadow" />;
}

function LinkPaints7() {
  return <div className="absolute bg-[#222222] inset-0 rounded-[24px]" data-name="Link paints" />;
}

function Container70() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[10px] right-[10px] top-[10px]" data-name="Container">
      <div className="basis-0 grow h-[200px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Image+Background">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#313131] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[173.97%] left-0 max-w-none top-[-36.99%] w-full" src={imgImageBackground5} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-[139.09px]" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.92)] top-[8.4px] translate-y-[-50%] w-[139.398px]">
        <p className="leading-[18px]">Departemen Teknik Sipil</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#008fff] box-border content-stretch flex items-start px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[18px] whitespace-pre">Aktif</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[4px] py-0 relative w-full">
          <Container71 />
          <Background8 />
        </div>
      </div>
    </div>
  );
}

function Margin17() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container72 />
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[15.9px] text-[rgba(255,255,255,0.92)] w-full">
        <p className="leading-[24px]">Dompet (0*05)</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[21px] not-italic relative shrink-0 text-[#9a9a9f] text-[14px] w-full">
        <p className="mb-0">dompet cewek warna krem beserta isinya: KTP,</p>
        <p>STNK,Uang dll, a/n Anita</p>
      </div>
    </div>
  );
}

function Margin18() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container74 />
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start justify-center left-[12px] pl-[4px] pr-0 py-0 right-[8px] top-[220px]" data-name="Container">
      <Margin17 />
      <Container73 />
      <Margin18 />
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[36px] items-center justify-center min-w-[367.95px] overflow-clip pb-[8.99px] pl-[151.98px] pr-[151.97px] pt-[8.01px] relative rounded-[12px] shadow-[0px_0px_0px_1px_#808080] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-nowrap text-white">
        <p className="leading-[18.57px] whitespace-pre">Detail</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute bottom-[14px] box-border content-stretch flex items-end left-[2.72%] pl-[4px] pr-[24px] py-0 right-[-2.72%]" data-name="Container">
      <Button9 />
    </div>
  );
}

function Link11() {
  return (
    <div className="h-[400px] min-h-[400px] relative rounded-[24px] shrink-0 w-full" data-name="Link">
      <OverlayShadow7 />
      <LinkPaints7 />
      <Container70 />
      <Container75 />
      <Container76 />
    </div>
  );
}

function LinkMargin9() {
  return (
    <div className="absolute bottom-[416px] box-border content-stretch flex flex-col items-start justify-center left-[767.9px] min-h-[416px] pb-0 pt-[16px] px-[8px] right-[60.15px] top-0" data-name="Link:margin">
      <Link11 />
    </div>
  );
}

function OverlayShadow8() {
  return <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_10px_160px_10px_rgba(17,12,46,0.05)]" data-name="Overlay+Shadow" />;
}

function LinkPaints8() {
  return <div className="absolute bg-[#222222] inset-0 rounded-[24px]" data-name="Link paints" />;
}

function Container77() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[10px] right-[10px] top-[10px]" data-name="Container">
      <div className="basis-0 grow h-[200px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Image+Background">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#313131] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[173.97%] left-0 max-w-none top-[-36.99%] w-full" src={imgImageBackground6} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-[79.09px]" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.92)] top-[8.4px] translate-y-[-50%] w-[79.412px]">
        <p className="leading-[18px]">Perpustakaan</p>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#008fff] box-border content-stretch flex items-start px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[18px] whitespace-pre">Aktif</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[4px] py-0 relative w-full">
          <Container78 />
          <Background9 />
        </div>
      </div>
    </div>
  );
}

function Margin19() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container79 />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.92)] w-full">
        <p className="leading-[24px]">Lainnya (Tws02**)</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9f] text-[14px] w-full">
        <p className="leading-[21px]">Tws hitam logo tiktok</p>
      </div>
    </div>
  );
}

function Margin20() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container81 />
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start justify-center left-[12px] pl-[4px] pr-0 py-0 right-[8px] top-[220px]" data-name="Container">
      <Margin19 />
      <Container80 />
      <Margin20 />
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[36px] items-center justify-center min-w-[367.95px] overflow-clip pb-[8.99px] pl-[151.98px] pr-[151.97px] pt-[8.01px] relative rounded-[12px] shadow-[0px_0px_0px_1px_#808080] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-nowrap text-white">
        <p className="leading-[18.57px] whitespace-pre">Detail</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute bottom-[14px] box-border content-stretch flex items-end left-[2.72%] pl-[4px] pr-[24px] py-0 right-[-2.72%]" data-name="Container">
      <Button10 />
    </div>
  );
}

function Link12() {
  return (
    <div className="h-[400px] min-h-[400px] relative rounded-[24px] shrink-0 w-full" data-name="Link">
      <OverlayShadow8 />
      <LinkPaints8 />
      <Container77 />
      <Container82 />
      <Container83 />
    </div>
  );
}

function LinkMargin10() {
  return (
    <div className="absolute bottom-0 box-border content-stretch flex flex-col items-start justify-center left-0 min-h-[416px] pb-0 pt-[16px] px-[8px] right-[828.05px] top-[416px]" data-name="Link:margin">
      <Link12 />
    </div>
  );
}

function OverlayShadow9() {
  return <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_10px_160px_10px_rgba(17,12,46,0.05)]" data-name="Overlay+Shadow" />;
}

function LinkPaints9() {
  return <div className="absolute bg-[#222222] inset-0 rounded-[24px]" data-name="Link paints" />;
}

function Container84() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[10px] right-[10px] top-[10px]" data-name="Container">
      <div className="basis-0 grow h-[200px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Image+Background">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
          <div className="absolute bg-[#313131] inset-0 rounded-[16px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute h-[173.97%] left-0 max-w-none top-[-36.99%] w-full" src={imgImageBackground6} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-[79.09px]" data-name="Container">
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18px] justify-center leading-[0] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.92)] top-[8.4px] translate-y-[-50%] w-[79.412px]">
        <p className="leading-[18px]">Perpustakaan</p>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#008fff] box-border content-stretch flex items-start px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[18px] whitespace-pre">Aktif</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[4px] py-0 relative w-full">
          <Container85 />
          <Background10 />
        </div>
      </div>
    </div>
  );
}

function Margin21() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container86 />
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[15.8px] text-[rgba(255,255,255,0.92)] w-full">
        <p className="leading-[24px]">Lainnya (Tws**)</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#9a9a9f] text-[14px] w-full">
        <p className="leading-[21px]">Tws thiknplus warna putih</p>
      </div>
    </div>
  );
}

function Margin22() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container88 />
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start justify-center left-[12px] pl-[4px] pr-0 py-0 right-[8px] top-[220px]" data-name="Container">
      <Margin21 />
      <Container87 />
      <Margin22 />
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex h-[36px] items-center justify-center min-w-[367.95px] overflow-clip pb-[8.99px] pl-[151.97px] pr-[151.98px] pt-[8.01px] relative rounded-[12px] shadow-[0px_0px_0px_1px_#808080] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-nowrap text-white">
        <p className="leading-[18.57px] whitespace-pre">Detail</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute bottom-[14px] box-border content-stretch flex items-end left-[2.72%] pl-[4px] pr-[24px] py-0 right-[-2.72%]" data-name="Container">
      <Button11 />
    </div>
  );
}

function Link13() {
  return (
    <div className="h-[400px] min-h-[400px] relative rounded-[24px] shrink-0 w-full" data-name="Link">
      <OverlayShadow9 />
      <LinkPaints9 />
      <Container84 />
      <Container89 />
      <Container90 />
    </div>
  );
}

function LinkMargin11() {
  return (
    <div className="absolute bottom-0 box-border content-stretch flex flex-col items-start justify-center left-[383.95px] min-h-[416px] pb-0 pt-[16px] px-[8px] right-[444.1px] top-[416px]" data-name="Link:margin">
      <Link13 />
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute h-[832px] left-[32px] right-[32px] top-[1340px]" data-name="Container">
      <LinkMargin7 />
      <LinkMargin8 />
      <LinkMargin9 />
      <LinkMargin10 />
      <LinkMargin11 />
    </div>
  );
}

function Container92() {
  return (
    <div className="basis-0 grow max-w-[1276px] min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Container9 />
      <Container14 />
      <Container19 />
      <Container55 />
      <Container91 />
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container92 />
    </div>
  );
}

function Container94() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[240.5px] max-w-[1360px] right-[20.5px] top-0" data-name="Container">
      <Container4 />
      <Container93 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[30.712px] relative shrink-0 w-[86px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 86 31">
        <g id="SVG">
          <path d={svgPaths.p13b57f0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.92)] text-center text-nowrap">
        <p className="leading-[19.2px] whitespace-pre">{`Lost & Found`}</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="box-border content-stretch flex items-center justify-center pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Container">
      <Container96 />
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container95 />
      <Container97 />
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex h-full items-center justify-center max-w-[184px] relative shrink-0" data-name="Container">
      <Container98 />
    </div>
  );
}

function Container100() {
  return (
    <div className="absolute h-[140px] left-0 right-[-0.1px] top-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-start justify-center pb-0 pt-[8px] px-[77.55px] relative">
        <Container99 />
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start pl-[20px] pr-0 py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['Inter:Medium',sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#808191] text-[12px]">
            <p className="leading-[16px]">Menu</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d={svgPaths.p18b99c00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Container">
      <Svg3 />
    </div>
  );
}

function Margin23() {
  return (
    <div className="box-border content-stretch flex flex-col h-[24px] items-start pl-0 pr-[16px] py-0 relative shrink-0 w-[40px]" data-name="Margin">
      <Container102 />
    </div>
  );
}

function Margin24() {
  return (
    <div className="box-border content-stretch flex flex-col items-start min-w-[56.33px] pl-0 pr-[44.675px] py-0 relative shrink-0 w-[101.005px]" data-name="Margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-nowrap text-white">
        <p className="leading-[21px] text-[14px] whitespace-pre">Beranda</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#007feb] box-border content-stretch flex h-[54px] items-center px-[20px] py-0 relative rounded-[12px] shrink-0 w-[215px]" data-name="Background">
      <Margin23 />
      <Margin24 />
    </div>
  );
}

function Link14() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Link">
      <Background11 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d={svgPaths.p2aa2a380} fill="var(--fill-0, #808191)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Container">
      <Svg4 />
    </div>
  );
}

function Margin25() {
  return (
    <div className="box-border content-stretch flex flex-col h-[24px] items-start pl-0 pr-[16px] py-0 relative shrink-0 w-[40px]" data-name="Margin">
      <Container103 />
    </div>
  );
}

function Margin26() {
  return (
    <div className="box-border content-stretch flex flex-col items-start min-w-[75.44px] pl-0 pr-[25.563px] py-0 relative shrink-0 w-[101.003px]" data-name="Margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#808191] text-[14px] text-nowrap">
        <p className="leading-[21px] whitespace-pre">Kehilangan</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="box-border content-stretch flex h-[54px] items-center px-[20px] py-0 relative rounded-[12px] shrink-0 w-[215px]" data-name="Container">
      <Margin25 />
      <Margin26 />
    </div>
  );
}

function Link15() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Link">
      <Container104 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d={svgPaths.p3c27eab1} fill="var(--fill-0, #808191)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Container">
      <Svg5 />
    </div>
  );
}

function Margin27() {
  return (
    <div className="box-border content-stretch flex flex-col h-[24px] items-start pl-0 pr-[16px] py-0 relative shrink-0 w-[40px]" data-name="Margin">
      <Container105 />
    </div>
  );
}

function Margin28() {
  return (
    <div className="box-border content-stretch flex flex-col items-start min-w-[71.84px] pl-0 pr-[29.163px] py-0 relative shrink-0 w-[101.003px]" data-name="Margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#808191] text-[14px] text-nowrap">
        <p className="leading-[21px] whitespace-pre">Penemuan</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="box-border content-stretch flex h-[54px] items-center px-[20px] py-0 relative rounded-[12px] shrink-0 w-[215px]" data-name="Container">
      <Margin27 />
      <Margin28 />
    </div>
  );
}

function Link16() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Link">
      <Container106 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d={svgPaths.p2bfea00} fill="var(--fill-0, #808191)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0 w-[21.16px]" data-name="Container">
      <Svg6 />
    </div>
  );
}

function Margin29() {
  return (
    <div className="box-border content-stretch flex flex-col h-[24px] items-start pl-0 pr-[16px] py-0 relative shrink-0 w-[37.16px]" data-name="Margin">
      <Container107 />
    </div>
  );
}

function Container108() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[28.4px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[21px] not-italic relative shrink-0 text-[#808191] text-[14px] text-nowrap whitespace-pre">
        <p className="mb-0">Lapor</p>
        <p>Kehilangan</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="box-border content-stretch flex h-[54px] items-center px-[20px] py-0 relative rounded-[12px] shrink-0 w-[215px]" data-name="Container">
      <Margin29 />
      <Container108 />
    </div>
  );
}

function Link17() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Link">
      <Container109 />
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d={svgPaths.p2bfea00} fill="var(--fill-0, #808191)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0 w-[21.71px]" data-name="Container">
      <Svg7 />
    </div>
  );
}

function Margin30() {
  return (
    <div className="box-border content-stretch flex flex-col h-[24px] items-start pl-0 pr-[16px] py-0 relative shrink-0 w-[37.71px]" data-name="Margin">
      <Container110 />
    </div>
  );
}

function Container111() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[31.45px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[21px] not-italic relative shrink-0 text-[#808191] text-[14px] text-nowrap whitespace-pre">
        <p className="mb-0">Lapor</p>
        <p>Penemuan</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="box-border content-stretch flex h-[54px] items-center px-[20px] py-0 relative rounded-[12px] shrink-0 w-[215px]" data-name="Container">
      <Margin30 />
      <Container111 />
    </div>
  );
}

function Link18() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Link">
      <Container112 />
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d={svgPaths.p2aa2a380} fill="var(--fill-0, #808191)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Container">
      <Svg8 />
    </div>
  );
}

function Margin31() {
  return (
    <div className="box-border content-stretch flex flex-col h-[24px] items-start pl-0 pr-[16px] py-0 relative shrink-0 w-[40px]" data-name="Margin">
      <Container113 />
    </div>
  );
}

function Margin32() {
  return (
    <div className="box-border content-stretch flex flex-col items-start min-w-[91.86px] pl-0 pr-[9.137px] py-0 relative shrink-0 w-[100.997px]" data-name="Margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#808191] text-[14px] text-nowrap">
        <p className="leading-[21px] whitespace-pre">Laporan Saya</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="box-border content-stretch flex h-[54px] items-center px-[20px] py-0 relative rounded-[12px] shrink-0 w-[215px]" data-name="Container">
      <Margin31 />
      <Margin32 />
    </div>
  );
}

function Link19() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Link">
      <Container114 />
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-full" data-name="Container">
      <Link14 />
      <Link15 />
      <Link16 />
      <Link17 />
      <Link18 />
      <Link19 />
    </div>
  );
}

function Container116() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[31px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <Container101 />
      <div className="absolute bg-[#292929] bottom-0 h-px left-[20px] right-[20px]" data-name="Horizontal Divider" />
      <Container115 />
    </div>
  );
}

function Container117() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start pl-[20px] pr-0 py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['Inter:Medium',sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#808191] text-[12px]">
            <p className="leading-[16px]">Insights</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d={svgPaths.p27751600} fill="var(--fill-0, #808191)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Container">
      <Svg9 />
    </div>
  );
}

function Margin33() {
  return (
    <div className="box-border content-stretch flex flex-col h-[24px] items-start pl-0 pr-[16px] py-0 relative shrink-0 w-[40px]" data-name="Margin">
      <Container118 />
    </div>
  );
}

function Margin34() {
  return (
    <div className="box-border content-stretch flex flex-col items-start min-w-[55.85px] pl-0 pr-[45.15px] py-0 relative shrink-0 w-[101px]" data-name="Margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#808191] text-[14px] text-nowrap">
        <p className="leading-[21px] whitespace-pre">Settings</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="h-[54px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[54px] items-center px-[20px] py-0 relative w-full">
          <Margin33 />
          <Margin34 />
        </div>
      </div>
    </div>
  );
}

function Link20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <Container119 />
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container117 />
      <Link20 />
    </div>
  );
}

function Container121() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Container116 />
      <Container120 />
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[20px] overflow-clip pb-[20px] pt-0 px-0 top-0 w-[215px]" data-name="Container">
      <Container121 />
    </div>
  );
}

function Container123() {
  return (
    <div className="h-full max-h-[643.2px] relative shrink-0 w-[255px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-auto relative w-[255px]">
        <Container122 />
      </div>
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="absolute bg-[#141414] box-border content-stretch flex h-[643.2px] items-start left-[0.5px] min-w-[256px] pb-0 pl-0 pr-[0.8px] pt-[140px] top-0 w-[256px]" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0.8px_0px_0px] border-[rgba(228,228,228,0.1)] border-solid inset-0 pointer-events-none" />
      <Container100 />
      <Container123 />
    </div>
  );
}

export default function Component1536WDefault() {
  return (
    <div className="relative size-full" data-name="1536w default" style={{ backgroundImage: "linear-gradient(90deg, rgb(20, 20, 20) 0%, rgb(20, 20, 20) 100%), linear-gradient(90deg, rgb(18, 18, 18) 0%, rgb(18, 18, 18) 100%)" }}>
      <BackgroundVerticalBorder />
      <Container94 />
    </div>
  );
}